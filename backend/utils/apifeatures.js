class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    //search by name
    search() {
        const keyWord = this.queryStr.keyword ? {
           name: {
               $regex: this.queryStr.keyword,
               $options: 'i'
           },
        } : {};
        this.query = this.query.find({ ...keyWord});
        return this;
    }

    //filter
    filter() {
        const queryStrCopy = { ...this.queryStr};
        const removeFields = ['keyword', 'page', 'limit'];
        removeFields.forEach((key) => delete queryStrCopy[key]);

        //add $ sign for price filter 
        let queryStr = JSON.stringify(queryStrCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;
    }

    //pagination
    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;