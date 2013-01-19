var base64 = require('./index')
  , expect = require('expect.js');

function buf(str){
  var buffer = new ArrayBuffer(str.length);
  var bytes = new Uint8Array(buffer);
  for(var i=0; i < str.length; i++)
    bytes[i] = str.charCodeAt(i);
  return buffer;
}

function str(buf){
  var string = '';
  var bytes = new Uint8Array(buf);
  for(var i=0; i < bytes.length; i++)
    string += String.fromCharCode(bytes[i]);
  return string;
}

describe('base64-arraybuffer',function(){

  describe('helpers',function(){

    it('buf > str',function(){
      expect(buf('abc')).to.eql(buf(str(buf('abc'))))
    })

    it('str > buf',function(){
      expect('123').to.eql(str(buf('123')))
    })

  })

  describe('encode',function(){

    it('empty buffer',function(){
      expect(base64.encode(new ArrayBuffer(0))).to.equal('')
    })

    it('1234',function(){
      var buf = new Uint8Array(4);
      buf[0] = 1;
      buf[1] = 2;
      buf[2] = 3;
      buf[3] = 4;
      expect(base64.encode(buf)).to.equal('AQIDBA==')
    })

    it('Hello world',function(){
      expect(base64.encode(buf('Hello world'))).to.equal('SGVsbG8gd29ybGQ=')
    })

    it('Man',function(){
      expect(base64.encode(buf('Man'))).to.equal('TWFu')
    })

    it('Ma',function(){
      expect(base64.encode(buf('Ma'))).to.equal('TWE=')
    })

    it('Hello worlds!',function(){
      expect(base64.encode(buf('Hello worlds!'))).to.equal('SGVsbG8gd29ybGRzIQ==')
    })

  })


  describe('decode',function(){

    it('empty string',function(){
      expect(base64.decode('')).to.eql(new ArrayBuffer(0))
    })

    it('Hello world',function(){
      expect(base64.decode('SGVsbG8gd29ybGQ=')).to.eql(buf('Hello world'))
    })

    it('Man',function(){
      expect(base64.decode('TWFu')).to.eql(buf('Man'))
    })

    it('Ma',function(){
      expect(base64.decode('TWE=')).to.eql(buf('Ma'))
    })

    it('Hello worlds!',function(){
      expect(base64.decode('SGVsbG8gd29ybGRzIQ==')).to.eql(buf('Hello worlds!'))
    })

    it('1234',function(){
      var buf = new Uint8Array(4);
      buf[0] = 1;
      buf[1] = 2;
      buf[2] = 3;
      buf[3] = 4;
      expect(base64.decode('AQIDBA==')).to.eql(buf.buffer)
    })

  })

})