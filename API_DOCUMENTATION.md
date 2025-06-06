# Roster API Documentation (Mock Endpoints)

This document outlines the mock API endpoints used in the Roster portfolio application.
These endpoints simulate backend interactions for development and demonstration purposes.
All data is currently persisted in the browser's `localStorage`.

---

## 1. Extract Portfolio Data

- **Function**: `mockExtractPortfolioData(url: string)`
- **Conceptual HTTP Method**: `POST` (though called as a function, it mimics sending a URL to a backend for processing)
- **Conceptual Path**: `/api/portfolio/extract`
- **Description**: Takes a portfolio URL, simulates data extraction, and returns structured profile data.
- **Request Body**:
  ```json
  {
    "url": "https://sonuchoudhary.my.canva.site/portfolio"
  }
  ```
- **Response (200 OK)**:
  - **Content-Type**: `application/json`
  - **Body**: `ProfileData` object. See `types/profile.ts` for the full structure.
  ```json
  {
    "username": "sonu",
    "firstName": "Sonu",
    "lastName": "Choudhary",
    "title": "Creative Director & Video Editor",
    "summary": "Passionate creative professional...",
    "location": "Mumbai, India",
    "originalUrl": "https://sonuchoudhary.my.canva.site/portfolio",
    "employers": [
      {
        "id": "1",
        "name": "Netflix",
        "jobTitle": "Senior Video Editor",
        "duration": "Jan 2023 - Present",
        "employmentType": "contract",
        "summary": "Lead video editor for original content series...",
        "videos": [
          {
            "id": "1",
            "title": "Netflix Original Series Trailer",
            "url": "/placeholder.svg?height=200&width=300",
            "thumbnail": "/placeholder.svg?height=200&width=300",
            "duration": "2:30"
          }
        ]
      }
    ]
  }
  ```
- **Response (400 Bad Request - e.g., invalid URL, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Invalid URL provided"
  }
  ```
- **Response (500 Internal Server Error - e.g., extraction failed, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Failed to extract portfolio data"
  }
  ```

---

## 2. Update Profile

- **Function**: `updateProfile(profileData: ProfileData)`
- **Conceptual HTTP Method**: `PUT`
- **Conceptual Path**: `/api/profiles/{username}` (where `{username}` is `profileData.username`)
- **Description**: Updates the entire profile data for a user.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Body**: `ProfileData` object.
  ```json
  {
    "username": "sonu",
    "firstName": "Sonu",
    "lastName": "Choudhary",
    "title": "Updated Title"
    // ... other fields
  }
  ```
- **Response (200 OK)**:
  - **Content-Type**: `application/json`
  - **Body**: The updated `ProfileData` object.
  ```json
  {
    "username": "sonu",
    "firstName": "Sonu",
    "lastName": "Choudhary",
    "title": "Updated Title"
    // ... other fields
  }
  ```
- **Response (404 Not Found - if profile doesn't exist, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Profile not found"
  }
  ```

---

## 3. Add Employer

- **Function**: `addEmployer(profileId: string, employer: Omit<Employer, "id">)`
  - Note: `profileId` is a parameter in the function signature but not used in the current mock implementation. The operation effectively adds to the profile data in context (e.g., `localStorage`).
- **Conceptual HTTP Method**: `POST`
- **Conceptual Path**: `/api/profiles/{username}/employers`
- **Description**: Adds a new employer to a user's profile.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Body**: `Employer` object (without `id`, as it's generated by the "backend").
  ```json
  {
    "name": "New Company",
    "jobTitle": "Developer",
    "duration": "Jan 2024 - Present",
    "employmentType": "full-time",
    "summary": "Developing cool stuff.",
    "videos": []
  }
  ```
- **Response (201 Created)**:
  - **Content-Type**: `application/json`
  - **Body**: The newly created `Employer` object, including its generated `id`.
  ```json
  {
    "id": "generated-unique-id",
    "name": "New Company",
    "jobTitle": "Developer",
    "duration": "Jan 2024 - Present",
    "employmentType": "full-time",
    "summary": "Developing cool stuff.",
    "videos": []
  }
  ```

---

## 4. Update Employer

- **Function**: `updateEmployer(employerId: string, employer: Employer)`
- **Conceptual HTTP Method**: `PUT`
- **Conceptual Path**: `/api/profiles/{username}/employers/{employerId}`
- **Description**: Updates an existing employer on a user's profile.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Body**: `Employer` object with updated fields. The `id` in the body should match `employerId` from the path.
  ```json
  {
    "id": "existing-employer-id",
    "name": "Updated Company Name",
    "jobTitle": "Senior Developer"
    // ... other fields
  }
  ```
- **Response (200 OK)**:
  - **Content-Type**: `application/json`
  - **Body**: The updated `Employer` object.
  ```json
  {
    "id": "existing-employer-id",
    "name": "Updated Company Name",
    "jobTitle": "Senior Developer"
    // ... other fields
  }
  ```
- **Response (404 Not Found - if employer doesn't exist, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Employer not found"
  }
  ```

---

## 5. Delete Employer

- **Function**: `deleteEmployer(employerId: string)`
- **Conceptual HTTP Method**: `DELETE`
- **Conceptual Path**: `/api/profiles/{username}/employers/{employerId}`
- **Description**: Deletes an employer from a user's profile.
- **Request Parameters**:
  - `employerId` (path parameter)
- **Response (204 No Content)**:
  - Indicates successful deletion. No response body.
- **Response (404 Not Found - if employer doesn't exist, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Employer not found"
  }
  ```

---

## 6. Add Video to Employer

- **Function**: `addVideo(employerId: string, video: Omit<Video, "id">)`
- **Conceptual HTTP Method**: `POST`
- **Conceptual Path**: `/api/profiles/{username}/employers/{employerId}/videos`
- **Description**: Adds a new video to a specific employer.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Body**: `Video` object (without `id`).
  ```json
  {
    "title": "New Project Showcase",
    "url": "https://example.com/new_video.mp4",
    "thumbnail": "https://example.com/new_thumbnail.jpg",
    "duration": "3:45"
  }
  ```
- **Response (201 Created)**:
  - **Content-Type**: `application/json`
  - **Body**: The newly created `Video` object, including its generated `id`.
  ```json
  {
    "id": "generated-video-id",
    "title": "New Project Showcase",
    "url": "https://example.com/new_video.mp4",
    "thumbnail": "https://example.com/new_thumbnail.jpg",
    "duration": "3:45"
  }
  ```
- **Response (404 Not Found - if employer doesn't exist, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Employer not found"
  }
  ```

---

## 7. Update Video

- **Function**: `updateVideo(videoId: string, video: Video)`
- **Conceptual HTTP Method**: `PUT`
- **Conceptual Path**: `/api/profiles/{username}/employers/{employerId}/videos/{videoId}`
- **Description**: Updates an existing video.
- **Request Body**:
  - **Content-Type**: `application/json`
  - **Body**: `Video` object with updated fields. The `id` in the body should match `videoId`.
  ```json
  {
    "id": "existing-video-id",
    "title": "Updated Video Title",
    "url": "https://example.com/updated_video.mp4"
    // ... other fields
  }
  ```
- **Response (200 OK)**:
  - **Content-Type**: `application/json`
  - **Body**: The updated `Video` object.
  ```json
  {
    "id": "existing-video-id",
    "title": "Updated Video Title"
    // ... other fields
  }
  ```
- **Response (404 Not Found - if video doesn't exist, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Video not found"
  }
  ```

---

## 8. Delete Video

- **Function**: `deleteVideo(videoId: string)`
- **Conceptual HTTP Method**: `DELETE`
- **Conceptual Path**: `/api/profiles/{username}/employers/{employerId}/videos/{videoId}`
- **Description**: Deletes a video.
- **Request Parameters**:
  - `videoId` (path parameter)
- **Response (204 No Content)**:
  - Indicates successful deletion. No response body.
- **Response (404 Not Found - if video doesn't exist, though not explicitly implemented in mock)**
  ```json
  {
    "error": "Video not found"
  }
  ```

---

## 9. Extract Skills from Text (Mock AI)

- **Function**: `mockExtractSkillsFromText(text: string)`
- **Conceptual HTTP Method**: `POST` (as it involves sending data for processing)
- **Conceptual Path**: `/api/ai/extract-skills`
- **Description**: Simulates an AI service that takes a string of text (e.g., job description, summary) and returns a list of potential skills found in that text.
- **Request Body**:
  ```json
  {
    "text": "Experienced in video editing, motion graphics, and project management for creative campaigns."
  }
  ```
- **Response (200 OK)**:
  - **Content-Type**: `application/json`
  - **Body**: An array of strings representing extracted skills.
  ```json
  ["Video Editing", "Motion Graphics", "Project Management"]
  ```
  - If no skills are found or input text is empty, returns an empty array `[]`.
- **Response (400 Bad Request - e.g., if text is missing, though not explicitly implemented in current mock beyond empty handling)**
  ```json
  {
    "error": "Input text is required"
  }
  ```

---

## 10. Analyze Job Match (Conceptual)

- **Function**: `mockAnalyzeJobMatch(profileData: ProfileData, jobText: string)`
- **Conceptual HTTP Method**: `POST` (as it involves sending data for processing)
- **Conceptual Path**: `/api/profile/analyze-job-match`
- **Description**: Simulates an analysis of the user's profile (`profileData`) against a provided job description text (`jobText`). It returns a match score and detailed insights.
- **Request Body (Conceptual)**:
  - While `profileData` is passed directly from the application context in the mock, and `jobText` is a direct parameter, conceptually, a backend endpoint might expect something like this:
  ```json
  {
    "profileData": {
      "username": "sonu",
      "skills": ["Video Editing", "Motion Graphics"],
      "employers": [
        {
          "summary": "Led video editing projects."
        }
      ]
    },
    "jobText": "Seeking a skilled Video Editor with experience in motion graphics..."
  }
  ```
- **Response (200 OK)**:
  - **Content-Type**: `application/json`
  - **Body**: `MatchResult` object (defined in `types/job.ts`).
  ```json
  {
    "overallScore": 75,
    "matchingSkills": ["Video Editing", "Motion Graphics"],
    "missingSkills": ["Adobe After Effects"],
    "matchingExperienceKeywords": ["Video Editing", "motion graphics"],
    "notes": "Good alignment. Your profile shows several key matches."
  }
  ```
  - If `jobText` is empty, `overallScore` will be 0 and `notes` will indicate the issue.
- **Response (400 Bad Request - e.g., if `jobText` is missing or `profileData` is invalid for a real backend)**
  ```json
  {
    "error": "Invalid input: Job description text and profile data are required."
  }
  ```
- **Response (500 Internal Server Error - e.g., if analysis fails unexpectedly)**
  ```json
  {
    "error": "An unexpected error occurred during job match analysis."
  }
  ```

---

**Note on Data Types:**
Refer to `types/profile.ts` for detailed structures of `ProfileData`, `Employer`, and `Video` types.
Also refer to `types/job.ts` for `MatchResult`.
