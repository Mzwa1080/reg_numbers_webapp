module.exports = function(pool) {

  async function inputReg(regNumber) {
    // entry validation
    if (!regNumber || regNumber == "") {
      return "Enter registration number once!";
    }

    regNumber = regNumber.toUpperCase();

    let tag = regNumber.substring(0, 3).trim();

    // check if this is a valid town
    // console.log(regNumber);
     // console.log(`tag: "${tag}"`);
    let foundTown = await pool.query("select id from towns where town_tag=$1", [tag]);

    if (foundTown.rows.length === 0) {
      return "Town does not exist!";
    }

    else{
// ----check if reg_nums table HAS existing registration numbers on reg_nums-----
      let getReg = await pool.query('select * from reg_nums where registration_num=$1', [regNumber]);
// --- THEN INSERT TO REG_NUMBER TABLE IF THE GETREG IS EMPTY && CONTAINS
      if (getReg.rows.length === 0) {
          await pool.query('insert into reg_nums(towns_id,registration_num) values($1,$2)', [foundTown.rows[0].id, regNumber]);
      }
    }
    return "Test Arrived Here!"

  }

  async function regMap() {
    let allRegs = await pool.query("select registration_num from reg_nums");
    return allRegs.rows;
  }

  async function forFiltering(tag) {
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

  async function reset() {
    console.log("clear is found");

    await pool.query("delete from reg_nums");
    // return clear.rowCount;
    // console.log(clear.rowCount);
  }

  return {
    inputReg,
    regMap,
    reset,
    forFiltering
  }
}
