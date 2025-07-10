import {
  getTopPolls,
  getRecentPolls,
  createPoll,
  getPollById,
} from "../services/poll-service.js";
import { createVote, getUserVotedPoll } from "../services/vote-service.js";

export const renderDashboard = async (req, res) => {
  try {
    const topPolls = await getTopPolls();
    const recentPolls = await getRecentPolls();
    res.set("Cache-Control", "no-store");
    return res.render("dashboard", {
      title: "Dashboard",
      topThreePolls: topPolls,
      recentPolls: recentPolls,
      errorMessage: "",
    });
  } catch (err) {
    console.error(err);
    return res.render("dashboard", {
      title: "Dashboard",
      topThreePolls: [],
      recentPolls: [],
      errorMessage:
        err.message ||
        "Sorry, there was an issue loading the dashboard. Please try again later.",
    });
  }
};

export const renderSubmitPoll = (req, res) => {
    res.set("Cache-Control", "no-store");
  res.render("create-poll", {
    title: "Create Poll",
    errorMessage: "",
  });
};

export const submitPoll = async (req, res) => {
  const { question, options } = req.body;
  try {
    await createPoll(req.user.id, question, options);
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    res.render("create-poll", {
      title: "Create Poll",
      errorMessage:
        err.message ||
        "There was an issue creating the poll. Please try again.",
    });
  }
};

export const renderPollResults = async (req, res) => {
  const pollId = req.params.id;
  const includeNoVotes = true;

  try {
    const isVoted = await getUserVotedPoll(req.user.id, pollId);
    if (!isVoted) {
      return res.redirect(`/polls/${pollId}/vote`);
    }
    const retrievedPoll = await getPollById(pollId, includeNoVotes);
    res.set("Cache-Control", "no-store");
    return res.render("poll-detail", {
      title: retrievedPoll.question,
      pollData: retrievedPoll,
      errorMessage: "",
    });
  } catch (err) {
    console.error(err);
    return res.render("poll-detail", {
      title: `${retrievedPoll.question} Results`,
      errorMessage:
        err.message ||
        "Sorry, there was an issue loading the poll results. Please try again later.",
    });
  }
};

export const renderPollVote = async (req, res) => {
  const pollId = req.params.id;
  try {
    const isVoted = await getUserVotedPoll(req.user.id, pollId);
    if (isVoted) {
      return res.redirect(`/polls/${pollId}`);
    }
    const retrievedPoll = await getPollById(pollId);
    res.set("Cache-Control", "no-store");
    return res.render("vote-poll", {
      title: retrievedPoll.question,
      poll: retrievedPoll,
      errorMessage: "",
    });
  } catch (err) {
    console.error(err);
    return res.render("vote-poll", {
      title: retrievedPoll.question,
      errorMessage:
        err.message ||
        "Sorry, there was an issue loading the poll. Please try again later.",
    });
  }
};

export const submitPollVote = async (req, res) => {
  const pollId = req.params.id;
  const { option_id } = req.body;
  try {
    const isVoted = await getUserVotedPoll(req.user.id, pollId);
    if (isVoted) {
      return res.redirect(`/polls/${pollId}`);
    }
    const voteData = {
      userId: req.user.id,
      optionId: parseInt(option_id),
    };
    await createVote(voteData);
    return res.redirect(`/polls/${pollId}`);
  } catch (err) {
    console.error(err);
    return res.render("vote-poll", {
      title: "Poll Vote",
      errorMessage:
        err.message ||
        "There was an issue submitting your vote. Please try again.",
    });
  }
};
