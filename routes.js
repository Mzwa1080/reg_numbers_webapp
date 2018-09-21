module.exports = function(myRoutes){
  async function home(req, res, next) {
    try {
      // regDisplay: await regNumberInstance.regMap();
      res.render('reg', {
        regDisplay: await myRoutes.regMap()
      });

    } catch (err) {
      next(err);
    }

  }

  async function regNumberSetup(req, res, next) {
   try {
     let textInput = req.body.text;
     if (textInput == "" || textInput == undefined) {
       req.flash("errorDisplay", "Please insert a valid registration once!");
       //  if(await myRoutes.inputReg(textInput) > 0){
       //   req.flash('errorDisplay', "Please enter a new number plate once!");
       // }
     }
     else {
       let message = await myRoutes.inputReg(textInput);
       if (message) {
         req.flash("errorDisplay", message);
       }
     }


     console.log( await myRoutes.inputReg(textInput));
     // if (textInput == "" || textInput == undefined) {
     //   req.flash('errorDisplay', "Please enter a new number plate once!");
     // }
     res.redirect('/');

   } catch (err) {
     next(err);
   }

 }

 async function filter(req, res, next) {
   try {

     let town = req.params.towns;
     // console.log(town);
     res.render('reg', {
       regDisplay: await myRoutes.forFiltering(town)
     })

   } catch (err) {
     next(err);
   }
 }

 async function resetBtn(req, res, next) {
   try {
     await myRoutes.reset();
     res.redirect('/');

   } catch (err) {
     next(err);
   }
 }

  return{
    home,
    regNumberSetup,
    filter,
    resetBtn
  }
}
