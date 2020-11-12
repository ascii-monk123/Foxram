const key = "1d8c04fb-5582-40d0-82ee-d13d71556aa7";

const DomEle = {
  inputField: document.querySelector(".query-field"),
  submitBtn: document.querySelector(".submit-query-btn"),
  result: document.querySelector(".result"),
};
let words = [];
let template = ``;
const spinTemplate = `  <div class="sk-chase">
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
          <div class="sk-chase-dot"></div>
        </div>`;
const makeTemplate = (data, type) => {
  template = "";
  data.forEach((word) => {
    template += ` <div class="card">
          <div class="card-content">
          <p>
          <b>${word.name}</b>
          <ul>`;
    word.definitions.forEach((def, index) => {
      template += `<li><b>${index + 1}></b> ${def}</li>`;
    });
    template += `</ul><br/>
        <b>Type: ${word.type}</b>
        </p>
        </div>
        </div>
        `;
  });
  return template;
};
const handleData = (data) => {
  words = data.map((word) => {
    return {
      name: word.meta.id,
      definitions: word.shortdef,
      type: word.fl,
    };
  });
  return words;
};

const showSpinner = () => {
  DomEle.result.innerHTML = "";
  DomEle.result.insertAdjacentHTML("afterbegin", spinTemplate);
};

const removeSpinner = () => {
  DomEle.result.innerHTML = "";
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
      showSpinner();
      const res = await axios.get(
        `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${query}?key=${key}`
      );
      removeSpinner();
      const filterData = handleData(res.data);
      const temp = makeTemplate(filterData);
      DomEle.result.innerHTML = "";
      DomEle.result.insertAdjacentHTML("afterbegin", temp);
    } catch (err) {
      console.log(err);
      removeSpinner();
      DomEle.result.innerHTML = `<p>Sorry results were not found</p>`;
    }
  } else {
    alert("Invalid Details");
  }
};

DomEle.submitBtn.addEventListener("click", fetchData);
