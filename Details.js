import React from 'react';

const Details = () => {
  const formValue = JSON.parse(localStorage.getItem("formDetails"))
  console.log("formValue", formValue);
  return (
	<div className="details">
		<h1>Hello</h1>
        <h3>Thanks for signing up, find your details below:</h3>
		<table>
			<tr>
				<th>First Name</th>
				<th>{formValue.firstName}</th>
			</tr>
			<tr>
				<th>Last Name</th>
				<th>{formValue.lastName}</th>
			</tr>
			<tr>
				<th>User Name</th>
				<th>{formValue.username}</th>
			</tr>
			<tr>
				<th>Phone Number</th>
				<th>{formValue.phoneNumber}</th>
			</tr>
			<tr>
				<th>Country Name</th>
				<th>{formValue.country}</th>
			</tr>
			<tr>
				<th>City Name</th>
				<th>{formValue.city}</th>
			</tr>
			<tr>
				<th>PAN Card Number</th>
				<th>{formValue.panNumber}</th>
			</tr>
			<tr>
				<th>Aadhar Card Number</th>
				<th>{formValue.aadharNumber}</th>
			</tr>
		</table>
	</div>
    
  )
}

export default Details
