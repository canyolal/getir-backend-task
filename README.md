# Getir Node.js Backend Task

https://can-yolal-getir-task.herokuapp.com/filterdata

This Node.js program handles HTTP post request for a single endpoint named "/filterdata". This API does a simple filtering operation on a data from MongoDB collection and returns a response with matching results.

## <b>Request Payload</b>

The request payload will include a JSON with 4 fields.

- “startDate” and “endDate” fields will contain the date in a “YYYY-MM-DD” format. You
  should filter the data using “createdAt”
- “minCount” and “maxCount” are for filtering the data. Sum of the “count” array in
  the documents should be between “minCount” and “maxCount”.

Sample Input:\
{

&nbsp;&nbsp;&nbsp;&nbsp;"startDate": "2016-01-26",\
&nbsp;&nbsp;&nbsp;&nbsp;"endDate": "2018-02-02",\
&nbsp;&nbsp;&nbsp;&nbsp;"minCount": 2700,\
&nbsp;&nbsp;&nbsp;&nbsp;"maxCount": 3000\
}

## <b>Response Payload</b>

Response payload have 3 main fields and returns JSON.

- “code” is for status of the request.
- “msg” is for description of the code.
- “records” will include all the filtered items according to the request.

{\
&nbsp;&nbsp;&nbsp;&nbsp;"code":0,\
&nbsp;&nbsp;&nbsp;&nbsp;"msg":"Success",\
&nbsp;&nbsp;&nbsp;&nbsp;"records":[\
&nbsp;&nbsp;&nbsp;&nbsp;{\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"key":"TAKwGc6Jr4i8Z487",\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"createdAt":"2017-01-28T01:22:14.398Z",\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"totalCount":2800\
&nbsp;&nbsp;&nbsp;&nbsp;},\
&nbsp;&nbsp;&nbsp;&nbsp;{\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"key":"NAeQ8eX7e5TEg7oH",\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"createdAt":"2017-01-27T08:19:14.135Z",\
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"totalCount":2900\
&nbsp;&nbsp;&nbsp;&nbsp;}\
&nbsp;&nbsp;&nbsp;&nbsp;]\
}

## <b>Response Codes</b>

Response codes are listed below:

### In case of successful responses

- <b>code:0, msg: 'success', records: [obj]</b> indicates that server found a matching doc(s)
- <b>code:0, msg: 'no match', records: []</b> indicates that server did not find any matching doc

### In case of server side errors

- <b>code:500, msg: 'error while processing', records: []</b> indicates that server encounter a problem while filtering docs
- <b>code:501, msg: 'error fetching from db', records: []</b> indicates that server encounter a problem while fetching docs

### In case of user error

- <b>code:400, msg: 'informative text w.r.t. error', records: []</b> indicates that user entered an invalid value for payload keys
- <b>code:404, msg: 'invalid url', records: []</b> indicates that user sent a request to invalid endpoint

## <b>Libraries</b>

- Express: server management
- mongoose: mongodb connection
- jest: testing
- supertest: testing
- cors: cross-origin resource sharing
- dotenv: environment parameters
- joi: payload validator
- heroku: deployment
