const assert = require('assert');
const Reg_number = require('../regNUmbers');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:coder123@localhost:5432/reg_number_test';

const pool = new Pool({
    connectionString
});

describe('The Registration Number Web App', async function(){
  // ------ MY ONLY INSTANCE -----
    const reg = Reg_number(pool);

    it('should pass if there\'s no registration number in the registration_num column/map', async function(){
        // the Factory Function is called Reg_number;
        console.log(await reg.inputReg('Found'));
        assert.equal("Enter registration number once!",  await reg.inputReg());
    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from reg_nums;");
    });

    it('should RETURN ALL registration numbers in the reg_numbers database', async function(){

        await reg.inputReg('CA 123-123');
        await reg.inputReg('CY 223-223');
        await reg.inputReg('CEY 231-231');
        await reg.inputReg('CL 992-992');

        // console.log(await reg.inputReg('CA 123-123'));
        assert.deepEqual(await reg.regMap(),
        [
              {"registration_num": "CA 123-123"},
              {"registration_num": "CY 223-223"},
              {"registration_num": "CEY 231-231"},
              {"registration_num": "CL 992-992"}
           ]);

    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from reg_nums;");
    });

    it('should return the Filtered Bellville Registration Numbers', async function(){

      await reg.inputReg("CA 123-123");
      await reg.inputReg("CY 098-765");
      await reg.inputReg("CY 233-555");
      await reg.inputReg("CL 123-456");
      // reg.inputReg("CEY 123-213");
      console.log(await reg.inputReg("CA 123-123"));
      console.log(await reg.inputReg("CY 098-765"));
      console.log(await reg.inputReg("CL 123-456"));

      assert.deepEqual([
        { registration_num: 'CY 098-765' },
        { registration_num: 'CY 233-555' }
      ], await reg.forFiltering("CY"));
    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from reg_nums;");
    });

    it('should return the Filtered Cape Town Registration Numbers', async function(){

      await reg.inputReg("CA 123-123");
      await reg.inputReg("CA 098-765");
      await reg.inputReg("CA 233-555");
      await reg.inputReg("CEY 123-456");

      assert.deepEqual([
        { registration_num: 'CA 123-123' },
        { registration_num: 'CA 098-765' },
        { registration_num: 'CA 233-555' }], await reg.forFiltering("CA"));
    });


    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from reg_nums;");
    });
    it('should return the Filtered Cape Town Registration Numbers', async function(){

      await reg.inputReg("CL 123-123");
      await reg.inputReg("CA 098-765");
      await reg.inputReg("CL 233-555");
      await reg.inputReg("CEY 123-456");

      assert.deepEqual([
        { registration_num: 'CL 123-123' },
        { registration_num: 'CL 233-555' }], await reg.forFiltering("CL"));
    });

    after(function(){
        pool.end();
    })
});
