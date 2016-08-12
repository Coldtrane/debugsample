/////////////////////////////////////////////////////////////////////
// Copyright (c) Autodesk, Inc. All rights reserved
// Written by Forge Partner Development
//
// Permission to use, copy, modify, and distribute this software in
// object code form for any purpose and without fee is hereby granted,
// provided that the above copyright notice appears in all copies and
// that both that copyright notice and the limited warranty and
// restricted rights notice below appear in all supporting
// documentation.
//
// AUTODESK PROVIDES THIS PROGRAM "AS IS" AND WITH ALL FAULTS.
// AUTODESK SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTY OF
// MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.  AUTODESK, INC.
// DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
// UNINTERRUPTED OR ERROR FREE.
/////////////////////////////////////////////////////////////////////
'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

// this session will be used to save the oAuth token
app.use(cookieParser());
app.use(session({
    secret: 'autodeskforge',
    resave: true,
    saveUninitialized: true
}));

// prepare server routing
var oauth = require('./routes/oauth');
app.use('/', express.static(__dirname + '/www')); // redirect static calls
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); // redirect static calls
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist')); // redirect static calls
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); // redirect static calls
app.use('/fonts', express.static(__dirname + '/node_modules/bootstrap/dist/fonts')); // redirect static calls
app.use('/api', oauth); // redirect oauth API calls
app.set('port', process.env.PORT || 3000); // main port

// start server
var server = app.listen(app.get('port'), function () {
    console.log('Starting at ' + (new Date()).toString());
    console.log('Server listening on port ' + server.address().port);
});