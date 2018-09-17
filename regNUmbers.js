module.exports = function () {
  var allRegs =  {};
  var valid = ["all", "CA", "CEY", "CL", "CJ"];
  var reg = '';
  // ca 1235
  function inputReg(regNumber) {
  if(allRegs[regNumber] !== ""){
    if(allRegs[regNumber] == undefined){
      let tag = regNumber.substring(0,3).trim();
       if (valid.includes(tag)) {
        //update reg and add to the maP
        allRegs[regNumber] = 0;
        return Object.keys(allRegs);
      }
    }
    return "ENTER ANOTHER ONE!";
   }
}
   function forRegMap() {
    return Object.keys(allRegs);
  }

  function returnAll(){
    if(allRegs === ""){
      return Object.keys(allRegs);
    }
    else if(allRegs !== ""){
      return allRegs;
    }
  }
   function forIndividual(){
    return reg;
  }

   function forFiltering(selectedTown) {
    var registrations = Object.keys(allRegs);
    if (selectedTown !== "All") {
      return registrations.filter(current => current.startsWith(selectedTown));
    }
    return registrations;
  }

  function reset(){
   let allRegs = {};
   let reg = "";
   registrations = "";

 }

   return {
    inputReg,
    forIndividual,
    //forRegNumber,
    forRegMap,
    returnAll,
    // returnAll,
    forFiltering
  }
}
