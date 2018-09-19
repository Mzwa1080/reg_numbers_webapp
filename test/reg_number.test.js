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

    // beforeEach(async function(){
    //     // clean the tables before each test run
    //     await pool.query("delete from users;");
    // });

    it('should pass if there\'s no registration number in the registration_num column/map', async function(){

        // the Factory Function is called Reg_number
        let reg = Reg_number(pool);
        await reg.inputReg();
        // let count = await reg.greetCounter();
        assert.equal(0, await reg.regMap());

    });

    beforeEach(async function(){
        // clean the tables before each test run
        await pool.query("delete from reg_nums;");
    });

    it('should pass if there\'s CA registration number in the map', async function(){

        // the Factory Function is called Reg_number
        let reg = Reg_number(pool);
        await reg.inputReg('CA 123-123');

        console.log(await reg.inputReg('CA 123-123'));
        // let count = await reg.greetCounter();
        assert.equal("CA", await reg.regMap());

    });




    after(function(){
        pool.end();
    })
});
