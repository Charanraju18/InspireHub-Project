const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["Instructor", "Learner"], required: true },
    profilePicture: { type: String },
    bio: { type: String, default: "", trim: true },
    phoneNumber: { type: String, default: "", trim: true },
    location: { type: String, default: "", trim: true },
    socialLinks: {
      linkedin: { type: String, default: "", trim: true },
      github: { type: String, default: "", trim: true },
      twitter: { type: String, default: "", trim: true },
      portfolio: { type: String, default: "", trim: true },
      youtube: { type: String, default: "", trim: true },
    },

    instructorProfile: {
      type: new mongoose.Schema(
        {
          experienceYears: Number,
          currentlyWorkingAt: String,
          currentRole: String,
          previousCompanies: [String],
          instructedDomains: [String],
          techStack: [String],
          content: {
            roadmapsShared: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            articlesWritten: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
            ],
            liveEventsHosted: [
              { type: mongoose.Schema.Types.ObjectId, ref: "LiveEvent" },
            ],
          },
          followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
          awards: [String],
          reviews: [
            {
              reviewer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
              rating: { type: Number, min: 1, max: 5 },
              comment: String,
              createdAt: { type: Date, default: Date.now },
            },
          ],
        },
        { _id: false }
      ),
      required: false,
    },

    learnerProfile: {
      type: new mongoose.Schema(
        {
          currentEducation: String,
          yearOfStudy: String,
          interestedDomains: [String],
          skillLevel: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
          },
          followingContent: {
            roadmaps: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            articles: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
            ],
          },
          completedContent: {
            roadmaps: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            articles: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
            ],
            liveEvents: [
              { type: mongoose.Schema.Types.ObjectId, ref: "LiveEvent" },
            ],
          },
          learningGoal: String,
          preferredLearningMode: {
            type: String,
            enum: ["Video", "Article", "Project-Based"],
          },
          followingInstructors: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User" },
          ],
          badges: [String],
          wishlist: {
            roadmaps: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Roadmap" },
            ],
            articles: [
              { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
            ],
            liveEvents: [
              { type: mongoose.Schema.Types.ObjectId, ref: "LiveEvent" },
            ],
          },
        },
        { _id: false }
      ),
      required: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const roadmapSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    domain: { type: String, trim: true },
    steps: [{ type: String, trim: true }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    tags: [{ type: String, trim: true }],
    coverImage: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const liveEventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    intro: { type: String, required: true, trim: true },
    sections: [
      {
        heading: { type: String, required: true, trim: true },
        points: [{ type: String, required: true, trim: true }],
        paragraph: { type: String, required: true, trim: true },
      },
    ],
    schedule: {
      price: { type: String, required: true, trim: true },
      instructor: { type: String, required: true, trim: true },
      image: { type: String, required: true },
      startTime: { type: Date, required: true },
      endTime: { type: Date, required: true },
      participants: { type: Number, default: 0 },
      location: { type: String, required: true, trim: true },
    },
    joinLink: { type: String, required: true, trim: true },
    registeredUsers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isLive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
const Roadmap = mongoose.model("Roadmap", roadmapSchema);
const Article = mongoose.model("Article", articleSchema);
const LiveEvent = mongoose.model("LiveEvent", liveEventSchema);

module.exports = { User, Roadmap, Article, LiveEvent };
