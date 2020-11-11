const key = "1d8c04fb-5582-40d0-82ee-d13d71556aa7";

const DomEle = {
  inputField: document.querySelector(".query-field"),
  submitBtn: document.querySelector(".submit-query-btn"),
};
let words = [];
const handleData = (data) => {
  words = data.map((word) => {
    return {
      name: word.meta.id,
      definitions: word.shortdef,
      type: word.fl,
    };
  });
  console.log(words);
};

const fetchData = async (e) => {
  e.preventDefault();
  const query = DomEle.inputField.value;
  if (
    query &&
    query !== "" &&
    !parseInt(query, 10) &&
    !parseFloat(query, 10) &&
    !/[^a-zA-Z]/.test(query)
  ) {
    try {
      const res = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${key}`
      );
      handleData(res.data);
    } catch (err) {
      console.log(err);
    }
  } else {
    alert("Invalid Details");
  }
};

DomEle.submitBtn.addEventListener("click", fetchData);
