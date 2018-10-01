module.exports = function(pool) {

  async function InputReg(regNumber) {
    // entry validation
    if (!regNumber || regNumber == "") {
      return "Enter registration number once!";
    }

    regNumber = regNumber.toUpperCase();
    // var regEx = /[CA 0-9]*/g;

    let tag = regNumber.split(" ",1).join();
    // console.log(convert);
    // let tag = regNumber.match(regEx).toString( );

    // console.log(tag, "Arrived");


    // console.log(tag);
    // check if this is a valid town
    let foundTown = await pool.query("select id from towns where town_tag=$1", [tag]);
    //If the FOUNDTOWN variable HAS 0-1 REGISTRATION == (tag) CHECK IT IF IT EXISTS && INSERT IT
    if (foundTown.rows.length === 1) {
      // ----check if reg_nums table HAS existing registration numbers on reg_nums-----
      let getReg = await pool.query('select * from reg_nums where registration_num=$1', [regNumber]);
      // console.log(getReg);
      // --- THEN INSERT TO REG_NUMBER TABLE IF THE GETREG IS EMPTY && CONTAINS
      if (getReg.rows.length === 0) {
        await pool.query('insert into reg_nums(towns_id,registration_num) values($1,$2)', [foundTown.rows[0].id, regNumber]);
      } else if (getReg.rowCount > 0) {
        // console.log(getReg.rowCount, "IKhona/Exists/Added");
        // console.log("Reached this part & error should display");
        return "You've entered an existing number plate, please enter a new one!";
      }
    } else {
     return "Please enter a registration number from the following towns \"CA\",\"CL\",\"CEY\",\"CJ\"/\"CY\""
    }
  }

  async function RegMap() {
    let allRegs = await pool.query("select registration_num from reg_nums");
    return allRegs.rows;
  }

  async function ForFiltering(tag) {
    let result = {};

    if (tag == "All") {
      result = await pool.query("select registration_num from reg_nums");
      // console.log("Return all");
      return result.rows;
    } else if (tag !== "") {
      result = await pool.query("select registration_num from towns join reg_nums on reg_nums.towns_id=towns.id where town_tag=$1", [tag]);
      return result.rows;
    }

  }

  async function Reset() {
    // console.log("clear is found");
    await pool.query("delete from reg_nums");
    // return clear.rowCount;
    // console.log(clear.rowCount);
  }

  return {
    InputReg,
    RegMap,
    Reset,
    ForFiltering
  }
}
