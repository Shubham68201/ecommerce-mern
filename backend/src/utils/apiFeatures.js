class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  // Search products by name or description
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            {
              name: {
                $regex: this.queryStr.keyword,
                $options: 'i' // case insensitive
              }
            },
            {
              description: {
                $regex: this.queryStr.keyword,
                $options: 'i'
              }
            }
          ]
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // Filter by price, category, ratings
  filter() {
    const queryCopy = { ...this.queryStr };

    // 1. Remove non-filter fields
    const removeFields = ['keyword', 'page', 'limit'];
    removeFields.forEach((el) => delete queryCopy[el]);

    // 2. Fix for "price[gte]" style strings (Manual Parsing)
    // Some parsers don't nest the object, this forces it:
    for (let key in queryCopy) {
      if (key.includes('[') && key.includes(']')) {
        const [mainKey, operator] = key.split(/[\[\]]/).filter(Boolean);
        if (!queryCopy[mainKey]) queryCopy[mainKey] = {};
        queryCopy[mainKey][operator] = queryCopy[key];
        delete queryCopy[key];
      }
    }

    // 3. Advanced filter for price, ratings etc.
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

    const finalQueryObj = JSON.parse(queryStr);

    // 4. Force string numbers into actual Numbers (Mongoose needs this for math ops)
    const convertToNumbers = (obj) => {
      for (const key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          convertToNumbers(obj[key]);
        } else if (!isNaN(obj[key]) && typeof obj[key] === 'string') {
          obj[key] = Number(obj[key]);
        }
      }
    };
    convertToNumbers(finalQueryObj);

    this.query = this.query.find(finalQueryObj);
    return this;
  }

  // Pagination
  pagination(resultsPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultsPerPage * (currentPage - 1);

    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

export default ApiFeatures;