const should = require('should');
var rewire = require('rewire');
var xbuild = rewire('../lib/xbuild');
var mockSpawn = require('mock-spawn');

describe('test xbuild.js', () => {
    describe('#build', () => {
        beforeEach((done) => {
            xbuild.__set__('spawn',mockSpawn());
            done();
        });

        it('should build sln success' ,(done) => {
            var options = {
                target:'Breeze',
                properties:{
                    Configuration:'Release',
                    Platform:'iPhone',
                    BuildIpa:true
                },
                solutionPath:'Breeze.sln'
            }

            xbuild(options).then((options) => {
               options.join(' ').should.be.equal('/p:Configuration=Release /p:Platform=iPhone /p:BuildIpa=true /t:Breeze Breeze.sln');
               done();
            }).catch((error) => {
                console.log('catch error',error);
                done(error);
            });
           
        });
       
    })
})