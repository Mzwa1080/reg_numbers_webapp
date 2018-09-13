module.exports = function (stored) {
  var allRegs = stored || {};
  var valid = ["CA", "CEY", "CL", "CJ","CN"];
  var reg = '';
  // ca 1235
  function inputReg(regNumber) {
  if(allRegs[regNumber] !== ""){
    if(allRegs[regNumber] == undefined){
      let tag = regNumber.substring(0,2).trim();

      if (valid.includes(tag)) {
        //update reg and add to the maP
        allRegs[regNumber] = 0;
        return Object.keys(allRegs);
      }
    }
    return false;

  }
}

  function forRegMap() {
    return Object.keys(allRegs);
  }

  function forIndividual(){
    return reg;
  }

  function reset(){
    inputReg() = {};
    let reg = ""
  }

  function forFiltering(selectedTown) {
    var registrations = Object.keys(allRegs);
    if (selectedTown !== "All") {
      return registrations.filter(current => current.startsWith(selectedTown));
    }
    return registrations;
  }

  return {
    inputReg,
    forIndividual,
    //forRegNumber,
    forRegMap,
    // returnAll,
    forFiltering
  }
}
