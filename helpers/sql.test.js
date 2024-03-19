const { sqlForPartialUpdate } = require("./sql");
const { BadRequestError } = require("../expressError");

describe("sqlForPartialUpdate", () => {
  test("returns object with setCols and values", () => {
    const dataToUpdate = { firstName: "Aliya", age: 32 };
    const jsToSql = { firstName: "first_name", age: "age" };

    const result = sqlForPartialUpdate(dataToUpdate, jsToSql);

    expect(result).toEqual({
      setCols: '"first_name"=$1, "age"=$2',
      values: ["Aliya", 32],
    });
  });

  test("throws error if no data passed", () => {
    expect(() => {
      sqlForPartialUpdate({}, {});
    }).toThrowError(BadRequestError);
  });

  test("works with missing jsToSql mapping", () => {
    const dataToUpdate = { firstName: "Aliya" };

    const result = sqlForPartialUpdate(dataToUpdate, {});

    expect(result).toEqual({
      setCols: '"firstName"=$1',
      values: ["Aliya"],
    });
  });
});
