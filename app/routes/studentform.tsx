import React from "react";

function StudentForm() {
  const [form, setForm] = React.useState(0);
  const handleNextForm = () => {
    setForm((prevForm) => prevForm + 1);
  };
  const handlePreviousForm = () => {
    setForm((prevForm) => prevForm - 1);
  };

  const [profile, setProfile] = React.useState({
    name: "",
    email: "",
    regnum: "",
    phone: "",
    dob: "",
    aadhaar: "",
    section: "",
    department: "",
    degree: "",
    sem: "",
    address: "",
    city: "",
    state: "",
  });

  const register = async () => {
    try {
      const response = await fetch("http://localhost:5050/api/profile/getprofiledetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        throw new Error("Failed to register profile");
      }

      const data = await response.json();
      console.log("Profile registered successfully:", data);
      alert("Registration successful!");
    } catch (error) {
      console.error("Error registering profile:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="h-screen w-full flex place-content-center place-items-center bg-black">
      <form>
        {form === 0 && (
          <div className="flex flex-col gap-5 bg-gray-900/20 border border-white/20 p-5 rounded-lg">
            <div className="grid grid-cols-2 grid-rows-3 gap-5 w-full">
              <TextField
                heading="Name"
                type="text"
                placeholder="Enter name"
                value={profile.name}
                onChange={(e) =>
                  setProfile({ ...profile, name: e.target.value })
                }
              />
              <TextField
                heading="Aadhaar Number"
                type="number"
                placeholder="Enter Aadhaar number"
                value={profile.aadhaar}
                onChange={(e) =>
                  setProfile({ ...profile, aadhaar: e.target.value })
                }
              />
              <TextField
                heading="Registration Num"
                type="text"
                placeholder="Enter registration number"
                value={profile.regnum}
                onChange={(e) =>
                  setProfile({ ...profile, regnum: e.target.value })
                }
              />
              <TextField
                heading="Phone Number"
                type="number"
                placeholder="Enter phone number"
                value={profile.phone}
                onChange={(e) =>
                  setProfile({ ...profile, phone: e.target.value })
                }
              />
              <TextField
                heading="Date of Birth"
                type="date"
                placeholder=""
                value={profile.dob}
                onChange={(e) =>
                  setProfile({ ...profile, dob: e.target.value })
                }
              />
              <TextField
                heading="Email"
                type="email"
                placeholder="Enter email address"
                value={profile.email}
                onChange={(e) =>
                  setProfile({ ...profile, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-1 items-center justify-between">
              <button
                onClick={handlePreviousForm}
                className="text-white bg-white/20 h-10 w-24 rounded"
              >
                Back
              </button>
              <button
                onClick={handleNextForm}
                className="text-white bg-white/20 h-10 w-24 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {form === 1 && (
          <div className="flex flex-col gap-5 bg-gray-900/20 border border-white/20 p-5 rounded-lg">
            <TextField
              heading="Section"
              type="text"
              placeholder="Enter class section"
              value={profile.section}
              onChange={(e) =>
                setProfile({ ...profile, section: e.target.value })
              }
            />
            <TextField
              heading="Degree"
              type="text"
              placeholder="Enter degree"
              value={profile.degree}
              onChange={(e) =>
                setProfile({ ...profile, degree: e.target.value })
              }
            />
            <div>
              <label
                htmlFor="department"
                className="text-lg text-white font-medium"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                value={profile.department}
                onChange={(e) =>
                  setProfile({ ...profile, department: e.target.value })
                }
                className="text-white bg-white/20 border-gray-300 rounded p-2 w-full"
                required
              >
                <option value="" disabled>
                  Select your department
                </option>
                <option value="Computer Science">Computer Science</option>
                <option value="Mechanical Engineering">
                  Mechanical Engineering
                </option>
                <option value="Electrical Engineering">
                  Electrical Engineering
                </option>
                <option value="Civil Engineering">Civil Engineering</option>
                <option value="Electronics and Communication">
                  Electronics and Communication
                </option>
                <option value="Information Technology">
                  Information Technology
                </option>
                <option value="Biotechnology">Biotechnology</option>
                <option value="Chemical Engineering">
                  Chemical Engineering
                </option>
                <option value="Physics">Physics</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Management Studies">Management Studies</option>
                <option value="Architecture">Architecture</option>
              </select>
            </div>
            <TextField
              heading="Current Semester"
              type="text"
              placeholder="Enter current semester"
              value={profile.sem}
              onChange={(e) => setProfile({ ...profile, sem: e.target.value })}
            />
            <div className="flex flex-1 items-center justify-between">
              <button
                onClick={handlePreviousForm}
                className="text-white bg-white/20 h-10 w-24 rounded"
              >
                Back
              </button>
              <button
                onClick={handleNextForm}
                className="text-white bg-white/20 h-10 w-24 rounded"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {form === 2 && (
          <div className="flex flex-col gap-5 bg-gray-900/20 border border-white/20 p-5 rounded-lg">
            <TextField
              heading="Address"
              type="text"
              placeholder="Enter address"
              value={profile.address}
              onChange={(e) =>
                setProfile({ ...profile, address: e.target.value })
              }
            />
            <TextField
              heading="City"
              type="text"
              placeholder="Enter city"
              value={profile.city}
              onChange={(e) => setProfile({ ...profile, city: e.target.value })}
            />
            <TextField
              heading="State"
              type="text"
              placeholder="Enter state"
              value={profile.state}
              onChange={(e) =>
                setProfile({ ...profile, state: e.target.value })
              }
            />
            <div className="flex flex-1 items-center justify-between">
              <button
                onClick={handlePreviousForm}
                className="text-white bg-white/20 h-10 w-24 rounded"
              >
                Back
              </button>
              <button
                type="button"
                onClick={register}
                className="text-white bg-blue-500 h-10 w-24 rounded"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default StudentForm;

const TextField = ({
  heading,
  type,
  placeholder,
  value,
  onChange,
}: {
  heading: string;
  type: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div>
      <label htmlFor={type} className="text-lg text-white font-medium">
        {heading}
      </label>
      <input
        type={type}
        id={type}
        name={type}
        value={value}
        onChange={onChange}
        className="text-white bg-white/20 border-gray-300 rounded p-2 w-full"
        placeholder={placeholder}
        required
      />
    </div>
  );
};