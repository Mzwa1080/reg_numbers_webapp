module.exports = function(pool) {

  async function inputReg(regNumber) {
    // entry validation
    if (!regNumber || regNumber == "") {
      return false;
    }
    regNumber = regNumber.toUpperCase();
    let tag = regNumber.substring(0, 2).trim();

    // check if this is a valid town
    let foundTown = await pool.query("select id from towns where town_tag=$1", [tag]);
    if (foundTown.rowCount === 0) {
      return "Town does not exist!";
    }

    await pool.query('insert into reg_nums(towns_id,registration_num) values($1,$2)', [foundTown.rows[0].id, regNumber]);
  }

  async function regMap() {
    let allRegs = await pool.query("select registration_num from reg_nums");
    return allRegs.rows;
  }

  async function forFiltering(tag){
    let result = {};

    if (tag == "" || tag ==undefined) {
      result = await pool.query("select registration_num from reg_nums");
    }

    result = await pool.query("select registration_num from towns join reg_nums on reg_nums.towns_id=towns.id where town_tag=$1",[tag]);
    console.log(result.rows);
    return result.rows;
  }

  async function reset() {
    let clear = await pool.query("delete from reg_nums");
    return clear.rowCount;
    console.log(clear.rowCount);
  }

  return {
    inputReg,
    regMap,
    reset,
    forFiltering
  }
}
