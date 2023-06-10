
export default function Create() {

  return (
    <form>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstname" id="firstName" value="" />
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastname" id="lastName" value="" />
      </div>

      { /* DatePicker */ }
      <div>
      <label htmlFor="dateOfBirth">Date of Birth</label>
        <input type="text" name="dateofbirth" id="dateOfBirth" value="" />
      </div>

      { /* DatePicker */ }
      <div>
        <label htmlFor="startDate">Start Date</label>
        <input type="text" name="startdate" id="startDate" value="" />
      </div>

      <fieldset>
        <legend>Address</legend>

        <div>
          <label htmlFor="street">Street</label>
          <input type="text" name="street" id="street" value="" />
        </div>

        <div>
        <label htmlFor="city">City</label>
          <input type="text" name="city" id="city" value="" />
        </div>

        <div>
          { /* Dropdown */ }
          <label htmlFor="state">State</label>
          <select name="state" id="state"></select>
        </div>

        <div>
          <label htmlFor="zipCode">Zip Code</label>
          <input type="number" name="zipcode" id="zipCode" value="0" />
        </div>
      </fieldset>

      <div>
          { /* Dropdown */ }
          <label htmlFor="department">Department</label>
          <select name="department" id="department"></select>
        </div>

        <button type="submit">Save</button>
    </form>
  )
}