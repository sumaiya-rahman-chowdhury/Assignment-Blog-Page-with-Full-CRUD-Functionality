Sure! Here's an overall documentation for your blog management system, covering key aspects such as the blog form, routes, mutations, and file handling. Feel free to adjust as needed for your specific use case.

---

# **Blog Management System Documentation**

This documentation provides an overview of the Blog Management System, including the form to create or edit blog posts, API routes, and file handling.

## **Table of Contents**
1. [Overview](#overview)
2. [Backend Routes](#backend-routes)
   - Create Blog
   - Edit Blog
   - Delete Blog
3. [Frontend](#frontend)
   - Blog Form Component
   - Blog Form Values
4. [File Handling](#file-handling)
5. [Error Handling](#error-handling)
6. [Mutations with React Query](#mutations-with-react-query)

---

## **Overview**
The Blog Management System allows users to create, edit, and delete blog posts. Users can upload images, fill in blog details such as title, category, and content, and submit them via a form. The system is built using `React`, `react-hook-form`, `@tanstack/react-query`, and `Express.js` for the backend.

## **Backend Routes**

### **Create Blog Post** (`POST /api/blogs/post`)
This endpoint is used to create a new blog post.

- **Request Body:**
  ```json
  {
    "author": "Author Name",
    "title": "Blog Title",
    "publicationDate": "2025-03-31",
    "category": "Travel",
    "subCategory": "Adventure",
    "travelTags": "Beach",
    "summary": "Short description of the blog",
    "content": "Full content of the blog",
    "images": [File]
  }
  ```
- **Response:**
  - `201 Created` on successful creation.
  - `400 Bad Request` if validation fails.
  - `500 Internal Server Error` for any errors during processing.

### **Edit Blog Post** (`PUT /api/blogs/:id`)
This endpoint is used to update an existing blog post by its ID.

- **Request Body:**
  - Same as the Create Blog Post endpoint.
- **Response:**
  - `200 OK` on successful update.
  - `404 Not Found` if the blog post is not found.
  - `500 Internal Server Error` for any errors during processing.

### **Delete Blog Post** (`DELETE /api/blogs/:id`)
This endpoint is used to delete a blog post by its ID.

- **Response:**
  - `200 OK` on successful deletion.
  - `404 Not Found` if the blog post is not found.
  - `500 Internal Server Error` for any errors during processing.

## **Frontend**

### **Blog Form Component**

The Blog Form is used to create or edit a blog post. It contains fields such as title, author, content, images, category, and others. Here's how the form works:

1. **Form Fields**:
   - **Author Name**: A text input to specify the author of the blog.
   - **Title**: A text input for the blog's title.
   - **Publication Date**: A date picker for the publication date.
   - **Category**: A dropdown to select a category (e.g., Travel, Food).
   - **Sub-Category**: A dropdown to select a sub-category (e.g., Adventure, Cultural).
   - **Summary**: A textarea for a brief summary of the blog.
   - **Content**: A textarea for the full content of the blog.
   - **Travel Tags**: A dropdown to select travel-related tags (e.g., Beach, Mountain).
   - **Images**: A file input to upload images associated with the blog.

2. **Form Submission**:
   - When the form is submitted, it triggers the `mutation.mutate()` function, which sends the form data to the backend.
   - The form data includes text fields and any selected images.

3. **Validation**:
   - The form uses `react-hook-form` for validation and form handling. `register` is used to bind the form fields to the form state.
   - The images field is handled as a `FileList | null` type.

4. **Preview**:
   - The form includes a "Preview" button that updates the preview section with the entered data. This allows users to see how their blog will look before submitting it.

5. **Image Upload**:
   - Images are uploaded as part of the `FormData` object. The `FileList` is iterated over to append individual files to the `FormData`.

### **Blog Form Values**
The form data is structured as follows:

```ts
export type BlogFormValues = {
  author: string;
  title: string;
  publicationDate: string;
  category: string;
  subCategory: string;
  travelTags: string;
  summary: string;
  content: string;
  images?: FileList | null; 
};
```

The `images` field is an optional field and can hold multiple files selected by the user.

## **File Handling**

The image files are handled using the `FileList` API. This allows you to access the selected files as follows:

1. **Accessing Files**:
   - After form submission, the `images` field contains a `FileList`, which is an array-like object that represents the selected files.
   - You can convert the `FileList` into an array using `Array.from()` for easier manipulation.

   ```ts
   if (data.images && data.images instanceof FileList) {
     Array.from(data.images).forEach((file) => {
       console.log(file.name);  
     });
   }
   ```

2. **Form Submission**:
   - When the form is submitted, a `FormData` object is created to handle both text fields and file uploads. Files are appended to `FormData` using the `append()` method.

   ```ts
   const formData = new FormData();
   Object.entries(data).forEach(([key, value]) => {
     if (key === "images" && value instanceof FileList) {
       Array.from(value).forEach((file) => formData.append("images", file));
     } else if (typeof value === "string") {
       formData.append(key, value);
     }
   });
   ```

3. **Uploading to the Server**:
   - The form sends a `POST` request to the backend with the `FormData` containing the blog data and the images.

## **Error Handling**

### **Frontend Errors**:
- When submitting the form or when an error occurs in fetching or mutating the data, appropriate error messages are shown to the user.
- React Query's `onError` callback handles errors during mutation or query operations.

### **Backend Errors**:
- The backend responds with relevant HTTP status codes:
  - `400 Bad Request` for invalid or missing data.
  - `404 Not Found` when trying to access or modify a non-existent blog post.
  - `500 Internal Server Error` for unexpected errors.

## **Mutations with React Query**

- The mutation is defined using `useMutation` from `react-query`. It sends a `POST` request to create a new blog post.
  
- **Mutation Setup**:
  ```tsx
  const mutation = useMutation({
    mutationFn: async (data: BlogFormValues) => {
      const formData = new FormData();
      
    },
    onSuccess: () => {
      alert("Blog published successfully!");
      reset(); 
    },
    onError: (error) => {
      alert(error.message || "Something went wrong.");
    },
  });
  ```

---

### **Conclusion**
This documentation provides an overview of the Blog Management System, including how to create, edit, and delete blog posts, handle file uploads, and manage errors. The system uses `React` with `react-hook-form` for form handling, `@tanstack/react-query` for mutations and queries, and `Express.js` for the backend. Ensure that you're handling `FileList` properly for image uploads and managing the form's state with `react-hook-form` effectively.

---

