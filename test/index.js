/*global describe, it*/
'use strict'

var crypto = require('crypto'),
	key = crypto.randomBytes(16),
	cipher = require('../')(key),
	cipher2 = require('../')(key.toString('hex')),
	should = require('should')

describe('cipher', function () {
	var data = String(Math.random()),
		cipherText

	it('should encrypt', function () {
		cipherText = cipher.encrypt(data)
		cipherText.should.be.String()
		cipherText.split(' ').should.have.length(4)
	})

	it('should encrypt with hex key', function () {
		cipherText = cipher2.encrypt(data)
		cipherText.should.be.String()
		cipherText.split(' ').should.have.length(4)
	})

	it('should decrypt', function () {
		cipher.decrypt(cipherText).should.be.equal(data)
	})

	it('should return undefined on any error', function () {
		var parts = cipherText.split(' '),
			otherValue = crypto.randomBytes(12).toString('hex')
		parts.length.should.be.equal(4)

		should(cipher.decrypt([otherValue, parts[1], parts[2], parts[3]].join(' '))).be.equal(undefined)
		should(cipher.decrypt([parts[0], otherValue, parts[2], parts[3]].join(' '))).be.equal(undefined)
		should(cipher.decrypt([parts[0], parts[1], otherValue, parts[3]].join(' '))).be.equal(undefined)
		should(cipher.decrypt([parts[0], parts[1], parts[2], otherValue].join(' '))).be.equal(undefined)
	})
})