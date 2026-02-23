"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Errors = {
  full_name?: string;
  email?: string;
  dob?: string;
  id_type?: string;
  document_file?: string;
};

export default function MilitaryDiscountEligibilityForm() {

  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fileName, setFileName] = useState("");

  // Age validation

  const calculateAge = (dob: string) => {

    const birthDate = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();

    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
      age--;

    return age;
  };


  const handleSubmit = async (e: any) => {

    e.preventDefault();

    setMessage("");

    const form = e.target;

    const full_name = form.full_name.value.trim();
    const email = form.email.value.trim();
    const dob = form.dob.value;
    const id_type = form.id_type.value;
    const document_file = form.document_file.files[0];

    let newErrors: Errors = {};

    // Validation

    if (!full_name)
      newErrors.full_name = "Full name is required";

    if (!email)
      newErrors.email = "Email is required";

    else if (!/^\S+@\S+\.\S+$/.test(email))
      newErrors.email = "Enter valid email";

    if (!dob)
      newErrors.dob = "Date of birth required";

    else if (calculateAge(dob) < 18)
      newErrors.dob = "Minimum age is 18";

    if (!id_type)
      newErrors.id_type = "Select ID type";

    if (!document_file)
      newErrors.document_file = "Upload document";


    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0)
      return;


    try {

      setLoading(true);

      const formData = new FormData();

      formData.append("full_name", full_name);
      formData.append("email", email);
      formData.append("dob", dob);
      formData.append("id_type", id_type);
      formData.append("document_file", document_file);


      const res = await fetch(

        `${API_BASE_URL}/api/military-discount/enrollment`,

        {
          method: "POST",
          headers: {
            Accept: "application/json",
          },
          body: formData,
        }

      );


      const data = await res.json();


      if (!res.ok)
        throw new Error(data.message || "Validation failed");


      setMessage("Enrollment submitted successfully ✅");

      form.reset();

      setFileName("");

      setErrors({});


    } catch (error: any) {

      setMessage(error.message);

    } finally {

      setLoading(false);

    }

  };


  return (

    <>
      <Header />

      <section className="bg-white py-16">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">


          {/* LEFT IMAGE */}


          <div>

            <img
              src="/img/melitery.webp"
              className="rounded-xl w-full max-w-md"
            />

          </div>



          {/* RIGHT FORM */}



          <div>


            <h2 className="text-3xl font-semibold mb-3">

              Military Discount Eligibility Form

            </h2>


            <p className="text-gray-600 mb-8">

              Verify your military status to receive exclusive discounts on your mobile plan.

              Please provide valid proof of service to qualify.

              <b>

                {" "}
                This is applicable for active Army Personnel & Army Veterans.
              </b>

            </p>



            <form onSubmit={handleSubmit}>


              <div className="grid md:grid-cols-2 gap-8">


                {/* LEFT */}


                <div>


                  <h3 className="font-semibold mb-6">

                    Your personal data

                  </h3>



                  {/* Name */}


                  <div className="mb-6">

                    <label className="block mb-2 font-medium">

                      Full Name *

                    </label>

                    <input
                      name="full_name"
                      placeholder="Enter your Full Name"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                    />

                    <p className="text-red-500 text-sm">
                      {errors.full_name}
                    </p>

                  </div>



                  {/* Email */}



                  <div className="mb-6">

                    <label className="block mb-2 font-medium">

                      Email *

                    </label>

                    <input
                      name="email"
                      placeholder="Enter Your Email Address"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                    />

                    <p className="text-red-500 text-sm">
                      {errors.email}
                    </p>

                  </div>



                  {/* DOB */}



                  <div>

                    <label className="block mb-2 font-medium">

                      Date of Birth *

                    </label>

                    <input
                      type="date"
                      name="dob"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                    />

                    <p className="text-red-500 text-sm">
                      {errors.dob}
                    </p>

                  </div>


                </div>



                {/* RIGHT */}



                <div>


                  <h3 className="font-semibold mb-6">

                    Identity documents

                  </h3>



                  {/* ID TYPE */}



                  <div className="mb-6">


                    <label className="block mb-2 font-medium">

                      Select Government-Issued ID *

                    </label>


                    <select
                      name="id_type"
                      className="w-full border rounded-lg px-4 py-3 outline-none focus:border-orange-500"
                    >

                      <option value="">
                        Select ID Type
                      </option>


                      <option value="DD Form 214">
                        DD Form 214
                      </option>


                      <option value="Military Retiree ID Card">
                        Military Retiree ID Card
                      </option>


                      <option value="VA Veteran ID Card">
                        VA Veteran ID Card
                      </option>


                      <option value="State Issued Veteran ID">
                        State Issued Veteran ID
                      </option>


                      <option value="Active Duty CAC">
                        Active Duty CAC
                      </option>


                    </select>


                    <p className="text-red-500 text-sm">
                      {errors.id_type}
                    </p>


                  </div>



                  {/* FILE */}



                  <div>


                    <label className="block mb-3 font-medium">

                      Upload Supporting Document *

                    </label>


                    <label className="bg-orange-500 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-orange-600">

                      Select File

                      <input
                        type="file"
                        name="document_file"
                        hidden
                        onChange={(e: any) =>
                          setFileName(e.target.files[0]?.name)
                        }
                      />

                    </label>


                    <p className="text-sm mt-2 text-gray-600">
                      {fileName}
                    </p>


                    <p className="text-red-500 text-sm">
                      {errors.document_file}
                    </p>


                  </div>



                </div>


              </div>



              {/* BUTTON */}



              <div className="text-center mt-10">


                <button

                  disabled={loading}

                  className="border-2 border-orange-500 text-orange-500 px-12 py-3 rounded-lg hover:bg-orange-500 hover:text-white"

                >


                  {loading ? "Submitting..." : "Submit"}


                </button>


              </div>



              {/* MESSAGE */}



              <p className="text-center mt-6 text-green-600 font-medium">

                {message}

              </p>



            </form>



          </div>



        </div>



      </section>


      <Footer />


    </>

  );

}