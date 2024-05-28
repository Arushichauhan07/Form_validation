// Form.js
import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Details from './Details';
import showPwdImg from './show-password.svg';
import hidePwdImg from './hide-password.svg';
import './App.css';

function Form() {
	const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
        phoneNumber: '',
        country: '',
        city: '',
        panNumber:'',
        aadharNumber:''
	});

	const [showPassword, setShowPassword] = useState(false);
	const [countries, setCountries] = useState();
    const [city, setCity] = useState();
    const [dialCode, setDialCode] = useState();
	


	const navigate = useNavigate();

	const [errors, setErrors] = useState({});

	useEffect(() => {
    const getCountries = async () => {
      const result1 = await fetch(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      try {
        const resjson1 = await result1.json();
        setCountries(resjson1);
      } catch (error) {
        console.log("error", error);
      }
    };
    getCountries();
  }, []);

  const getCity = async (getcountry) => {
    const result2 = await fetch(
      "https://countriesnow.space/api/v0.1/countries/cities",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: getcountry,
        }),
      }
    );
    try {
      const resjson2 = await result2.json();
      setCity(resjson2);
    } catch (error) {
      console.log("error", error);
    }
  };

   const getDialCode = async (getcountry) => {
    const result3 = await fetch(
      "https://countriesnow.space/api/v0.1/countries/codes",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          country: getcountry,
        }),
      }
    );
    try {
      const resjson3 = await result3.json();
      setDialCode(resjson3.data.dial_code);
    } catch (error) {
      console.log("error", error);
    }
  	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};
	console.log("formData",formData);

	const handleSubmit = (e) => {
		e.preventDefault();
        
        const newErrors = validateForm(formData);
		setErrors(newErrors);

		if (Object.keys(newErrors).length === 0) {
            localStorage.setItem("formDetails", JSON.stringify(formData))
            navigate('/details');
			
            // Form submission logic here
			console.log('Form submitted successfully!');
		} else {
			console.log(`Form submission failed
			due to validation errors.`);
		}
	};

	const validateForm = (data) => {
		const errors = {};

		if (!data.username.trim()) {
			errors.username = 'Username is required';
		}
		if (!data.firstName.trim()) {
			errors.firstName = 'First Name is required';
		}
		if (!data.lastName.trim()) {
			errors.lastName = 'Last Name is required';
		}
		if (!data.phoneNumber.trim()) {
			errors.phoneNumber = 'Phone Number is required';
		}
		if (!data.country.trim()) {
			errors.country = 'Country is required';
		}
		if (!data.city.trim()) {
			errors.city = 'City is required';
		}
		if (!data.panNumber.trim()) {
			errors.panNumber = 'PAN card number is required';
		}
		if (!data.aadharNumber.trim()) {
			errors.aadharNumber = 'Aadhar number is required';
		}
		if (!data.confirmPassword.trim()) {
			errors.confirmPassword = 'Confirm your password';
		}
		if (!data.email.trim()) {
			errors.email = 'Email is required';
		} else if (!/\S+@\S+\.\S+/.test(data.email)) {
			errors.email = 'Email is invalid';
		}

		if (!data.password.trim()) {
			errors.password = 'Password is required';
		} else if (!/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(data.password)) {
			errors.password = `Password must be 8 letters long with atleast one capital one small letter and one special character .`;
		}

		if (data.confirmPassword !== data.password) {
			errors.confirmPassword = 'Passwords do not match';
		}

		return errors;
	};

	return (

		<div className="form-container">
			<h2 className="form-title">Form Validation</h2>
			<form onSubmit={handleSubmit}>
                <div>
					<label className="form-label">
						First Name:
						</label>
					<input
						className="form-input"
						type="text"
						name="firstName"
						placeholder='First Name'
						value={formData.firstName}
						onChange={handleChange}
					/>
					{errors.firstName &&
						<span className="error-message">
							{errors.firstName}
						</span>
					}
				</div>
                <div>
					<label className="form-label">
						Last Name:
						</label>
					<input
						className="form-input"
						type="text"
						name="lastName"
						placeholder='Last Name'
						value={formData.lastName}
						onChange={handleChange}
					/>
					{errors.lastName &&
						<span className="error-message">
							{errors.lastName}
						</span>
					}
				</div>
				<div>
					<label className="form-label">
						Username:
						</label>
					<input
						className="form-input"
						type="text"
						name="username"
						placeholder='User Name'
						value={formData.username}
						onChange={handleChange}
					/>
					{errors.username &&
						<span className="error-message">
							{errors.username}
						</span>
					}
				</div>
				<div>
					<label className="form-label">
						Email:
						</label>
					<input
						className="form-input"
						type="email"
						name="email"
						placeholder='Email'
						value={formData.email}
						onChange={handleChange}
					/>
					{errors.email &&
						<span className="error-message">
							{errors.email}
						</span>
					}
				</div>
				<div className='password-input'>
					<label className="form-label">
						Password:
						</label>
					<input
						className="form-input password"
						type={showPassword? "password" : "text"}
						name="password"
						placeholder='Password'
						value={formData.password}
						onChange={handleChange}
					/> 
					<img
          			title={showPassword ? "Hide password" : "Show password"}
          			src={showPassword ? hidePwdImg : showPwdImg}
          			onClick={() => setShowPassword(prevState => !prevState)}
        			/>	
					{errors.password &&
						<span className="error-message">
							{errors.password}
						</span>
					}		
				</div>
				<div>
					<label className="form-label">
						Confirm Password:
					</label>
					<input
						className="form-input"
						type="password"
						name="confirmPassword"
						placeholder='Confirm Password'
						value={formData.confirmPassword}
						onChange={handleChange}
					/>
					{errors.confirmPassword &&
						<span className="error-message">
							{errors.confirmPassword}
						</span>
					}
                </div>
                <div>    
                    <label className="form-label">
						Country:
					</label>
					<select className='country' onChange={(e) => {
          			getCity(e.target.value);
         			getDialCode(e.target.value);
					setFormData({
						...formData,
						country: e.target.value,
					})
        			}}
      				>			
                    <option value="" disabled selected>
         			 Select Country
        			</option>
        			{countries?.data.map((x, y) => (
          			<option key={y}>{x.name}</option>
        			))}
                    </select>
					{errors.country &&
						<span className="error-message">
							{errors.country}
						</span>
					}
                </div>
				<div>
					<label className='form-label'>
						City
					</label>
      				<select className='city' onChange={(e)=>{
						setFormData({
						...formData,
						city: e.target.value,
					})
					}}>
        			<option value="" disabled selected>
        			  Select City
        			</option>
        			{city?.data.map((x, y) => (
         		    <option key={y}>{x}</option>
        			))}
      				</select>
					{errors.city &&
						<span className="error-message">
							{errors.city}
						</span>
					}
				</div>
				<div>
					<label className='form-label'>Phone Number</label>
      				<input className='phoneNumber' name='phoneNumber'
					type='text'
       				value={dialCode}
					placeholder='Phone Number'
        			onChange={(e) => {
          			setDialCode(e.target.value);
					setFormData({
						...formData,
						phoneNumber: e.target.value,
					})
        			}}
      				/>
					{errors.phoneNumber &&
						<span className="error-message">
							{errors.phoneNumber}
						</span>
					}
				</div>
      			 <div>    
                    <label className="form-label">
						PAN Number:
					</label>
                    <input
						className="form-input"
						type="text"
						name="panNumber"
						placeholder='PAN Card Number'
						value={formData.panNumber}
						onChange={handleChange}
					/>
					{errors.panNumber &&
						<span className="error-message">
							{errors.panNumber}
						</span>
					}
				</div>
                <div>    
                    <label className="form-label">
						Aadhar Number:
					</label>
                    <input
						className="form-input"
						type="text"
						name="aadharNumber"
						placeholder='Aadhar Card Number'
						value={formData.aadharNumber}
						onChange={handleChange}
					/>
					{errors.aadharNumber &&
						<span className="error-message">
							{errors.aadharNumber}
						</span>
					}
				</div>
				<button className="submit-button"
					type="submit" onClick={handleSubmit}>Submit</button>
			</form>
			
		</div>
	);
}

export default Form;
