import React from "react";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const QueryForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="bg-[#e3f4f2] p-6 rounded-2xl shadow-lg max-w-2xl mx-auto border-2 border-[#0d9488]">
      <h2 className="text-2xl font-semibold text-[#394e6a] text-center mb-4">
        Submit Your Query
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextField
          label="Full Name"
          variant="outlined"
          {...register("fullName", { required: "Full Name is required" })}
          error={!!errors.fullName}
          helperText={errors.fullName?.message}
          className="bg-white"
        />
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          {...register("email", { required: "Email is required" })}
          error={!!errors.email}
          helperText={errors.email?.message}
          className="bg-white"
        />
        <TextField
          label="Mobile"
          type="tel"
          variant="outlined"
          {...register("mobile", { required: "Mobile is required" })}
          error={!!errors.mobile}
          helperText={errors.mobile?.message}
          className="bg-white"
        />
        <TextField
          label="Course"
          variant="outlined"
          {...register("course", { required: "Course is required" })}
          error={!!errors.course}
          helperText={errors.course?.message}
          className="bg-white"
        />
        <TextField
          label="Mention your query in brief"
          multiline
          rows={4}
          variant="outlined"
          {...register("query", { required: "Query is required" })}
          error={!!errors.query}
          helperText={errors.query?.message}
          className="col-span-1 md:col-span-2 bg-white"
        />
        <div className="col-span-1 md:col-span-2">
          <Button type="submit" variant="contained" color="primary" className="bg-[#0d9488] hover:bg-[#0b7c70] text-white">
            Submit Query
          </Button>
        </div>
      </form>
    </div>
  );
};

export default QueryForm;
