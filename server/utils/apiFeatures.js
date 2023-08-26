class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = { ...this.queryStr };
    //   Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    queryStr = JSON.parse(queryStr);
    if (queryStr.brand) {
      if (typeof queryStr.brand === "string") {
        queryStr.brand = {
          $regex: queryStr.brand,
          $options: "i",
        };
      } else {
        if (queryStr.brand && queryStr.brand.length) {
          queryStr.brand = {
            $in: queryStr.brand.map((b) => (b = new RegExp(b))),
          };
        }
      }
    }
    this.query = this.query.find(queryStr);
    // this.filteredProductsCount=this.query.length;
    return this;
  }

  pagination(resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.find().limit(resultPerPage).skip(skip);

    return this;
  }
}

export default ApiFeatures;
