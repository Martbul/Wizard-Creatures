const router = require("express").Router();
const creatureService = require("../services/creatureService");
router.get("/all", async (req, res) => {
  const creatures = await creatureService.getAll().lean();
  //console.log({creatures});
  //                              подавам creatures на темплейта
  res.render("post/all-posts", { creatures });
});

router.get("/create", (req, res) => {
  res.render("post/create");
});

router.post("/create", async (req, res) => {
  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };
  //console.log(payload);

  await creatureService.create(payload);

  res.redirect("/posts/all");
});

router.get("/profile", async (req, res) => {
  const { user } = req;

  const myCreatures = await creatureService.getMyCreatures(user?._id).lean();
  console.log({ owner: myCreatures[0].owner?.firstName });

  res.render("post/profile", { myCreatures });
});

router.get("/:creatureId/details", async (req, res) => {
  const { creatureId } = req.params;
  //console.log({ creatureId });

  const creature = await creatureService.getSingleCreature(creatureId).lean();

  const { user } = req;
  const { owner } = creature;
  //onsole.log({user}, {owner});
  const isOwner = user?._id === owner.toString();
  //console.log({isOwner});
  const hasVoted = creature.votes?.some((v) => v?._id.toString() === user?._id);
  const joinedEmailsOfOwners = creature.votes.map((v) => v.email).join(', ')


  res.render("post/details", { creature, isOwner , hasVoted,joinedEmailsOfOwners});
});

router.get("/:creatureId/edit", async (req, res) => {
  const { creatureId } = req.params;
  const creature = await creatureService.getSingleCreature(creatureId).lean();

  res.render("post/edit", { creature });
});

router.post("/:creatureId/edit", async (req, res) => {
  const { creatureId } = req.params;

  const { name, species, skinColor, eyeColor, image, description } = req.body;
  const payload = {
    name,
    species,
    skinColor,
    eyeColor,
    image,
    description,
    owner: req.user,
  };
  await creatureService.update(creatureId, payload);

  res.redirect(`/posts/${creatureId}/details`);
});

router.get("/:creatureId/delete", async (req, res) => {
  const { creatureId } = req.params;

  console.log(creatureId);
  await creatureService.delete(creatureId);

  res.redirect("/posts/all");
});

router.get("/:creatureId/vote", async (req, res) => {
  const { creatureId } = req.params;
  const { _id } = req.user;
  await creatureService.addVotesToCreature(creatureId, _id);

  res.redirect(`/posts/${creatureId}/details`);
});

module.exports = router;
