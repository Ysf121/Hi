const LOCAL_STORAGE_FILTERS_KEY = "filter.key";
localStorage.clear();
let Filters = JSON.parse(localStorage.getItem(LOCAL_STORAGE_FILTERS_KEY)) || {
  categories: [],
  brands: [],
  sizes: [],
  prices: [],
};
const CategorySelections = document.querySelectorAll(
  "[data-category-selection]"
);
const BrandSelections = document.querySelectorAll("[data-brand-selection]");
const SizeSelections = document.querySelectorAll("[data-size-selection]");
const PriceSelections = document.querySelectorAll("[data-price-selection]");
const SearchFilters = document.querySelector("[data-search-filters]");
const FiltersDisplayContainer = document.querySelector(
  "[data-filters-container]"
);
const Products = document.querySelectorAll(".product");
CategorySelections.forEach((a) => {
  a.addEventListener("click", () => {
    if (a.classList.contains("selected")) {
      const index = Filters.categories.indexOf(a.innerText);
      Filters.categories.splice(index, 1);
      UpdateFilter();
    } else {
      Filters.categories.push(a.innerText);
      UpdateFilter();
    }
  });
});
BrandSelections.forEach((a) => {
  a.addEventListener("click", () => {
    if (a.classList.contains("selected")) {
      const index = Filters.brands.indexOf(a.innerText);
      Filters.brands.splice(index, 1);
      UpdateFilter();
    } else {
      Filters.brands.push(a.innerText);
      UpdateFilter();
    }
  });
});
SizeSelections.forEach((s) => {
  s.addEventListener("click", () => {
    if (s.checked) {
      Filters.sizes.push(s.value);
      UpdateFilter();
    } else {
      const index = Filters.sizes.indexOf(s.value);
      Filters.sizes.splice(index, 1);
      UpdateFilter();
    }
  });
});
const ApplyButtons = document.querySelectorAll("[data-apply-button]");
ApplyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    SaveFilter();
    FilterProduct();
  });
});
SearchFilters.addEventListener("click", (e) => {
  if (e.target.tagName.toLowerCase() === "i") {
    DeleteFilter(e.target.parentNode.innerText, e.target.dataset.FilterType);
    UpdateFilter();
    FilterProduct();
    SaveFilter();
  }
});
function UpdateFilter() {
  CategorySelections.forEach((selection) => {
    if (Filters.categories.includes(selection.innerText)) {
      selection.classList.add("selected");
    } else {
      selection.classList.remove("selected");
    }
  });
  BrandSelections.forEach((selection) => {
    if (Filters.brands.includes(selection.innerText)) {
      selection.classList.add("selected");
    } else {
      selection.classList.remove("selected");
    }
  });
  SizeSelections.forEach((selection) => {
    if (Filters.sizes.includes(selection.value)) {
      selection.checked = true;
    } else {
      selection.checked = false;
    }
  });
  if (Filters.prices.length < 2) return;
  PriceSelections[0].value = Filters.prices[0];
  PriceSelections[1].value = Filters.prices[1];
}

function FilterProduct() {
  if (
    Filters.categories.length === 0 &&
    Filters.brands.length === 0 &&
    Filters.sizes.length === 0 &&
    Filters.prices.length === 0
  ) {
    SearchFilters.classList.add("hide");
    ClearElement(FiltersDisplayContainer);
    Products.forEach((product) => {
      product.classList.remove("active");
    });
  } else {
    SearchFilters.classList.remove("hide");
    ClearElement(FiltersDisplayContainer);
    for (var j = 0; j < Filters.categories.length; j++) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      i.classList.add("fa-sharp", "fa-solid", "fa-circle-xmark", "unfilter");
      i.dataset.FilterType = "categories";
      li.innerText = Filters.categories[j];
      li.append(i);
      FiltersDisplayContainer.append(li);
    }
    for (var j = 0; j < Filters.brands.length; j++) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      i.classList.add("fa-sharp", "fa-solid", "fa-circle-xmark", "unfilter");
      i.dataset.FilterType = "brands";
      li.innerText = Filters.brands[j];
      li.append(i);
      FiltersDisplayContainer.append(li);
    }
    for (var j = 0; j < Filters.sizes.length; j++) {
      const li = document.createElement("li");
      const i = document.createElement("i");
      i.classList.add("fa-sharp", "fa-solid", "fa-circle-xmark", "unfilter");
      i.dataset.FilterType = "sizes";
      li.innerText = Filters.sizes[j];
      li.append(i);
      FiltersDisplayContainer.append(li);
    }
    /*Show Element With That matches this filters*/
    Products.forEach((product) => {
      let CategoryMatches = false;
      let BrandMatches = false;
      let SizesMatches = false;
      let PriceMatches = false;
      if (Filters.categories.indexOf("All") !== -1) {
        CategoryMatches = true;
      } else {
        Filters.categories.forEach((category) => {
          if (product.classList.contains(category.replace(/\s/g, ""))) {
            CategoryMatches = true;
          }
        });
      }
      Filters.brands.forEach((brand) => {
        if (product.classList.contains(brand.replace(/\s/g, ""))) {
          BrandMatches = true;
        }
      });
      Filters.sizes.forEach((size) => {
        product
          .querySelector(".sizes-available")
          .querySelectorAll(".size-available")
          .forEach((available) => {
            if (available.innerText == size) {
              SizesMatches = true;
            }
          });
      });
      let ProductPrice = product
        .querySelector(".product-type-price")
        .querySelector(".product-price")
        .innerText.replace("$", "");
      let MinPrice = Filters.prices[0] || 50;
      let MaxPrice = Filters.prices[1] || 700;
      if (
        parseInt(ProductPrice) > MinPrice &&
        parseInt(ProductPrice) < MaxPrice
      ) {
        PriceMatches = true;
      }

      if ((CategoryMatches || BrandMatches || SizesMatches) && PriceMatches) {
        product.classList.add("active");
      } else {
        product.classList.remove("active");
      }
    });
  }
}
function DeleteFilter(filter_name, filter_type) {
  const index = Filters[filter_type].indexOf(filter_name);
  Filters[filter_type].splice(index, 1);
}

function ClearElement(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}

function ChangePricesSelection(s) {
  if (parseInt(s.value) < parseInt(s.min)) {
    s.value = s.min;
  }
  if (parseInt(s.value) > parseInt(s.max)) {
    s.value = s.max;
  }
  Filters.prices[0] = PriceSelections[0].value;
  Filters.prices[1] = PriceSelections[1].value;
  UpdateFilter();
}
function SaveFilter() {
  localStorage.setItem(LOCAL_STORAGE_FILTERS_KEY, JSON.stringify(Filters));
}

UpdateFilter();
FilterProduct();
