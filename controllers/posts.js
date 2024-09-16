import mongoose from "mongoose";
import PostMessages from "../models/postMessage.js";

export const getPosts = async (req, res) => {
   try {
      const postMessages = await PostMessages.find()
      res.status(200).json(postMessages);
   } catch (err) {
      res.status(404).json({message:err.message})
  }
};

export const createPost = async (req, res) => {
   const body = req.body;
   const newPost = new PostMessages({
     title: body.title,
     message: body.message,
     creator: body.creator,
      tags: body.tags,
     selectedFile: body.selectedFile
   });

   try {
      await newPost.save();
      res.status(201).json(newPost)
   }
   catch(err) {
      res.status(409).json({message:err.message})
   }
};


export const deletePost = async (req, res) => {
   const { id } = req.params;
   try {
      const deletedPost = await PostMessages.findByIdAndDelete({ _id: id });
      if (deletedPost) {
         console.log("Document deleted", deletedPost)
         res.json(`Documnet with ID ${id} removed`)
      }
      else {
         res.json("No documnet found with that Id")
      }
   }
   catch (err) {
      res.status(409).json({message:err.message})
   }
}

export const updatePost = async (req,res) => {
   const { id } = req.params;
   const body = req.body;
   try {
      const updatedPost = await PostMessages.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            title: body.title,
            message: body.message,
            creator: body.creator,
            tags: body.tags,
            selectedFile: body.selectedFile,
          },
        }
      );


      res.status(200).json(updatedPost)
   }
   catch (err) {
      res.json({message:err.message})
   }
}


export const likePost = async (req, res) => {
  const { id } = req.params;

  try {
    // Update the likeCount of the post directly
    const updatedPost = await PostMessages.findByIdAndUpdate(
      id,
      { $inc: { likeCount: 1 } }, // Use $inc to increment the likeCount by 1
      { new: true } // Return the updated document
    );

    // If post not found, return 404
    if (!updatedPost)
      return res.status(404).json({ message: "Post not found" });

    // Send the updated post as a response
    res.status(200).json(updatedPost);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ message: "Something went wrong", error });
  }
};

