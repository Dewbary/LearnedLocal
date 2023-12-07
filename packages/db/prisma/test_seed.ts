import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function main() {
  const categories = await prisma.category.createMany({
    data: [
      {name: "Outdoors"},
      {name: "Arts & Crafts"},
      {name: "Technology"},
      {name: "Other"}
    ]
  });

  const testUser = await prisma.profile.create({
    data: {
      userId: "user_2YmmDeuBYeGfXVXVTtsQMMhbLUM",
      firstName: "Learned",
      lastName: "Local",
      bio: "Hey there! This is Learned Local. We're a test account with all sorts of experience in testing. Want to get tested? Please contact us for more information!",
      venmo: "learned-local-1",
      zelle: "learnedlocal.app@gmail.com",
      email: "learnedlocal.app@gmail.com",
      phone: "2081234567",
      profileImage: "https://expslzcpaajwxutcztdj.supabase.co/storage/v1/object/public/experience-photos/user_2YmmDeuBYeGfXVXVTtsQMMhbLUM/logo.png",
      insta: "@learnedlocal.app",
      facebook: "learnedlocal",
      personalTitle: "Event Hosting Service"
    }
  });

  const testExperience = await prisma.experience.create({
    data: {
      authorId: "user_2YmmDeuBYeGfXVXVTtsQMMhbLUM",
      title: "Test Experience",
      description: "You'll learn how to test different experiences with our experience!",
      price: 15,
      location: {
        "lat": 40.2590926,
        "lng": -111.6580143
      },
      locationDescription: "Alta apartments baby!",
      qualifications: "You need to be qualified",
      minAge: 0,
      activityLevel: "Some activity required",
      skillLevel: "Beginner",
      maxAttendees: 15,
      photos: ["https://expslzcpaajwxutcztdj.supabase.co/storage/v1/object/public/experience-photos/user_2YmmDeuBYeGfXVXVTtsQMMhbLUM/experienceimage1.webp"],
      slugId: "d2fb8c36-7732-493e-8ae5-a54811a38fcb",
      categoryId: 1,
      stripePriceId: "nope",
      stripeProductId: "nada",
      verified: true,
      city: "Provo",
      profileId: testUser.id,
      isFutureExperience: false,
      free: true,
      isExternalListing: false,
      isFull: false,
      activityNotes: ["Prepare for some activity", "Some activity will be required", "Other stuff"],
      includedItems: ["Items will be included", "You'll learn how to include more items"],
      prepItems: ["Items will be prepared", "You'll need to prepare some of your own items"],
      additionalInformation: "You'll be required to sell your soul to the devil :)",
      timeline: "",
      provided: "",
      guestRequirements: ""
    }
  });

  const testAvailability = await prisma.experienceAvailability.create({
    data: {
      experienceId: testExperience.id,
      startTime: new Date(2024, 11, 20, 20, 30, 0),
      endTime: new Date(2024, 11, 20, 22, 30, 0)
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });

export {};