const should = require('should');
var rewire = require('rewire');
var xbuild = rewire('../lib/xbuild');

describe('test xbuild.js', () => {
    describe('#build', () => {
        beforeEach((done) => {
            xbuild.__set__('exec',require('./mocks/child_process.mock.js').exec);
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

               options.join(' ').should.be.equal('/p:Configuration=Release /p:Platform=iPhone /p:BuildIpa=true /target:Breeze Breeze.sln');
            }).catch((error) => {
                console.log('catch error',error);
            }).finally(()=>{
                done();
            });
           
        });
       
    })
})