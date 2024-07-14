const fs = require("fs");
const superagent = require("superagent");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject("File not found");
      resolve(data);
    });
  });
};

const writefilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject("File not found");
      resolve("Successful");
    });
  });
};

// Async Await
const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);

    // getting one dog image
    // const res = await superagent.get(
    //   `https://dog.ceo/api/breed/${data}/images/random`
    // );

    // getting multiple dog images at the same time
    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const images = all.map((el) => el.body.message);
    console.log(images);
    // console.log(all.res.body.message);

    await writefilePro("dog-img.txt", images.join("\n"));
    console.log("Random dog image saved to file");
  } catch (err) {
    console.log(err);
    throw err;
  }
  return "2 Ready";
};

// getting the returned value from getDogPic()
(async () => {
  try {
    const x = await getDogPic();
  } catch {
    console.log("there was an error");
  }
})();

// getDogPic()
//   .then((x) => {
//     console.log(x);
//   })
//   .catch((err) => {
//     console.log("There was an error");
//   });

// using promises
// readFilePro(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(`Breed ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);

//     return writefilePro("dog-img.txt", res.body.message);
//   })
//   .then(() => {
//     console.log("Random dog image saved to file");
//   })
//   .catch((err) => {
//     console.log(err);
//     // input other logic
//   });

// call back hell
// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed ${data}`);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res.body.message);

//       fs.writeFile("dog-img.txt", res.body.message, (err) => {
//         if (err) return console.log(err.message);
//         console.log("Random dog image saved to file");
//       });
//     })
//     .catch((err) => {
//       console.log(err.message);
//       // input other logic
//     });
// });
