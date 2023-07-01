import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./MovieCRUD.scss"; // Import the SCSS file for styling
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";


const MovieCRUD = (props) => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const env =
    process.env.NODE_ENV === "development"
      ? process.env.REACT_APP_DEV_MODE_baseURL
      : process.env.REACT_APP_PRO_MODE_baseURL;
  // console.log(props);
  // let query=useLocation()
  // let search=new URLSearchParams(query)
  const validationSchema = yup.object().shape({
    title: yup.string().required("Title is required"),
    imageUrl: yup.string().url().required("Image URL is required"),
    trailerUrl: yup.string().required("Trailer URL is required"),
    director: yup.string().required("Director is required"),
    releaseDate: yup.string().required("Release Date is required"),
    genre: yup.string().required("Genre is required"),
    description: yup.string().required("Description is required"),
    // cast: yup.array().of(yup.string()).min(1, 'At least one cast member is required').required('Cast is required'),
    tags: yup.string().required("Tags are required"),
    cast: yup.string().required("cast are required"),
  });
  useEffect(() => {
    if (props.mode == "edit") {
      console.log(query.get("id"));
      var currentId=query.get("id")
      axios.get(`${env}/api/movies/${currentId}`).then((response) => {
        console.log(response);
        // movieObjChange(response.data);
        setValue('title', response.data.title, { shouldValidate: true })
        setValue('imageUrl', response.data.imageUrl, { shouldValidate: true })
        setValue('trailerUrl', response.data.trailerUrl, { shouldValidate: true })
        setValue('director', response.data.director, { shouldValidate: true })
        setValue('releaseDate', response.data.releaseDate, { shouldValidate: true })
        setValue('genre', response.data.genre, { shouldValidate: true })
        setValue('description', response.data.description, { shouldValidate: true })
        setValue('tags', response.data.tags.length>1?response.data.tags.join(","):response.data.tags, { shouldValidate: true })
        setValue('cast', response.data.tags.length>1?response.data.cast.join(","):response.data.tags, { shouldValidate: true })
      });
    }
    
  }, []);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: "onChange", // Enable form validation on change
  });

  const onSubmit = (data) => {
    // Handle form submission
    // console.log(data);

    let sendData = {
      ...data,
      cast: data.cast.split(","),
      tags: data.tags.split(","),
    };
    console.log(sendData);
    if(props.mode=="edit"){
      var currentId=query.get("id")
      axios.put(`${env}/api/movies/${currentId}`,sendData).then((response) => {
        navigate("/description?id="+response.data._id)
      })
    }
    if(props.mode=="add"){
      axios.post(`${env}/api/movies`,sendData).then((response) => {
        navigate("/description?id="+response.data._id)
      })
    }
  };

  return (
    <form className="add-movie-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-field">
        <label>Title:</label>
        <input type="text" name="title" {...register("title")} />
        {errors?.title && <span>{errors.title.message}</span>}
      </div>
      <div className="form-field">
        <label>Image URL:</label>
        <input type="text" name="imageUrl" {...register("imageUrl")} />
        {errors?.imageUrl && <span>{errors.imageUrl.message}</span>}
      </div>

      <div className="form-field">
        <label>Trailer URL:</label>
        <input type="text" name="trailerUrl" {...register("trailerUrl")} />
        {errors?.trailerUrl && <span>{errors.trailerUrl.message}</span>}
      </div>

      <div className="form-field">
        <label>Director:</label>
        <input type="text" name="director" {...register("director")} />
        {errors?.director && <span>{errors.director.message}</span>}
      </div>

      <div className="form-field">
        <label>Cast:</label>
        <input type="text" name="cast" {...register("cast")} />
        {errors?.cast && <span>{errors.cast.message}</span>}
      </div>

      <div className="form-field">
        <label>Release Date:</label>
        <input type="date" name="releaseDate" {...register("releaseDate")} />
        {errors?.releaseDate && <span>{errors.releaseDate.message}</span>}
      </div>

      <div className="form-field">
        <label>Genre:</label>
        <input type="text" name="genre" {...register("genre")} />
        {errors?.genre && <span>{errors.genre.message}</span>}
      </div>

      <div className="form-field">
        <label>Tags:</label>
        <input type="text" name="tags" {...register("tags")} />
        {errors?.tags && <span>{errors.tags.message}</span>}
      </div>
      <div className="form-field">
        <label>Description:</label>
        <textarea name="description" {...register("description")} />
        {errors?.description && (
          <span className="error-message">{errors.description.message}</span>
        )}
      </div>

      <button className="button-17" type="submit" disabled={!isValid}>
        {props.mode.charAt(0).toUpperCase()+props.mode.slice(1)+" Movie"}
      </button>
    </form>
  );
};

export default MovieCRUD;
