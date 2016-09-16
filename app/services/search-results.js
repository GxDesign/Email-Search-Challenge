import Ember from 'ember';
/* globals $ */

export default Ember.Service.extend({
	getSearchResults(email, callback) {
		var username = localStorage.activeUser;
        var storedReports, result;

		if(localStorage[username + "_reports"]){
			storedReports = JSON.parse(localStorage[username + "_reports"]);
		} else {
			storedReports = [];
		}

		// Check if report exists in local storage
		if(storedReports && storedReports.filterBy('query', email).length > 0){
			result = storedReports.filterBy('query', email)[0];
			result.created_at = new Date();

			// save new order of past reports
			localStorage[username + "_reports"] = JSON.stringify(storedReports); 

			console.log("retrieved saved result:", result);
			callback(result);
		} else {

			// if the report doesnt exist in localStorage, we'll attempt an ajax to the API.
			// if it fails, we will use sample reports

		    $.ajax({
				type: 'GET',
			    url: 'https://query.datadeckio.com/email',
			    dataType :"json",
			    data: {
			      api_key: 'nHMapbi0co3hHH6N6IDHl8BJkDuOjQBO1nLbnNu9',
			      email: email
			    },
			    error: function() {

			    	//// CORS error message
			    	// localStorage[username + "_reports"] = JSON.stringify(sampleReports);
			    	// var errorMsg_start = "<div class='cors-error container'>" +
			    	//   					 "<h2>Uh Oh, API access is verboten! (403)</h2>" +
			    	// 					 "<div class='bg-danger'>" +
					   //  				 "<p>Seems like CORS is blocking your API calls. No worries, I've loaded some sampleReports to your localStorage. Try any of the following emails: </p>" +
					   //  				 "<ul>";
				    // for(var i = 0; i < sampleReports.length; i++) {
				    // 	var email_option = "<li><a href='/search?email=" + sampleReports[i].query + "'>" + sampleReports[i].query + "</a></li>";
				    // 	errorMsg_start += email_option;
				    // }

				    // errorMsg_start += "</ul></div></div>";

				    // $(".cors-error").remove();
				    // $("main").append(errorMsg_start);
                     
				    result = null;

			    },
			    success: function(data) {
			      console.log("new search result:", data);
			      reformatResults(data);
			    }
			}).done(function(){
				callback(result);
			});



            
            var reformatResults = function(data) {
            	result = data;
            	result.created_at = new Date();
            	result.query = email;
	            // add new results to past results
				storedReports[storedReports.length] = result;
				// save to local storage
	            localStorage[username + "_reports"] = JSON.stringify(storedReports); 
            };


   			// use for testing when ajax calls are blocked. already reformatedResults
    //         var sampleReports = [        
				// // Stefani ( stefani@beenverified.com )
				// {"query": "stefani@beenverified.com", "report_info":{"query_id":null,"report_id":"30bd0f11-e20e-4987-9977-6d958ba5aa86"},"bvids":[],"names":[{"full":"Stefani Ribaudo","parts":{"salutation":"","first_name":"Stefani","middle_name":"","last_name":"Ribaudo","suffix":""},"first_seen":"","last_seen":""}],"emails":[{"email_address":"stefani@beenverified.com","first_seen":"","last_seen":""}],"jobs":[],"educations":[],"images":[{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/76e28bdbe29072fbb653c6e1120c3fa6_9fd5202e864ea73df50f190657b9ba6e7c7c5076a47720a871706791ee003ccd","thumb":"","confidence_score":50,"source":"twitter"},{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/ce76eecb0111081d441c9f8dad598549_30adab723c780b6022b15511d719ab99968268d731dbeb0a05f8affa878b4a49","thumb":"","confidence_score":50,"source":"facebook"}],"social":[{"type":"angellist","url":"https://angel.co/stefani-ribaudo","source":1,"followers":13,"following":null},{"type":"twitter","url":"https://twitter.com/stefaniribaudo","source":1,"followers":15,"following":64},{"type":"facebook","url":"https://www.facebook.com/stefani.ribaudo","source":1,"followers":null,"following":null},{"type":"foursquare","url":"https://foursquare.com/user/5531788","source":1,"followers":null,"following":null},{"type":"linkedin","url":"https://www.linkedin.com/pub/stefani-ribaudo/0/b96/22","source":1,"followers":null,"following":null}]},

				// // Jason ( jamster@beenverified.com )
		  //       {"query": "jamster@beenverified.com", "report_info":{"query_id":null,"report_id":"8b68cf54-25e2-4684-82a4-bcc3b0c2b861"},"bvids":["N_NTU1Mzc0ODc="],"names":[{"full":"Jason Amster","parts":{"salutation":"","first_name":"Jason","middle_name":"","last_name":"Amster","suffix":""},"first_seen":"","last_seen":""},{"full":"Mr Jason Michael Amster","parts":{"salutation":"Mr","first_name":"Jason","middle_name":"Michael","last_name":"Amster","suffix":""},"first_seen":"","last_seen":""}],"emails":[{"email_address":"jamster@beenverified.com","first_seen":"","last_seen":""}],"jobs":[{"company":"Amster Family Investments Inc","title":"Partner","industry":""},{"company":"Redken 5th Avenue/L'OrÃ©al USA","title":"Interactive Marketing Manager","industry":""},{"company":"Redken 5th Avenue/L'Oreal USA","title":"Web Developer","industry":""},{"company":"Comvision","title":"Intern","industry":""},{"company":"BeenVerified","title":"Chief Technology Officer","industry":""}],"educations":[{"school":"Rutgers University-New Brunswick","degree":"BS","attended":{"start":"2000-01-01","end":"2003-12-31"}},{"school":"Marlboro High School","degree":"","attended":{"start":"1992-01-01","end":"1996-12-31"}}],"images":[{"url":"https://avatars.githubusercontent.com/u/9894?v=3","thumb":"","confidence_score":25,"source":""},{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/d4e3d7119cca160d770fb69b12ca6f24_62803ca61cc206a5f72e0b2702e53692ed6a45b4e056543d258dca077633ca13","thumb":"","confidence_score":50,"source":"facebook"},{"url":"http://lh4.googleusercontent.com/-tDgVJCEi6iU/AAAAAAAAAAI/AAAAAAAAAyU/8EcW7jzW0hw/photo.jpg","thumb":"","confidence_score":25,"source":""},{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/0f55fa1bb9dfc032fc9a29e452f0a2b5_727af2c55a5a70f930e6070922ddee4339475628e3920ad77d04e6f099e0a887","thumb":"","confidence_score":50,"source":"gravatar"},{"url":"https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/000/090/3f0/3c99a40.jpg","thumb":"","confidence_score":25,"source":""},{"url":"http://graph.facebook.com/695906313/picture?type=large","thumb":"","confidence_score":25,"source":""}],"social":[{"type":"gravatar","url":"http://en.gravatar.com/60257374b85ade8826280bd1403fd8b7","source":2,"followers":null,"following":null},{"type":"github","url":"https://github.com/jamster","source":1,"followers":null,"following":null},{"type":"foursquare","url":"https://foursquare.com/user/6839821","source":1,"followers":null,"following":null},{"type":"aboutme","url":"https://about.me/jamster","source":1,"followers":null,"following":null},{"type":"gravatar","url":"http://en.gravatar.com/f6b1e969acaee1b3765e4183a4f0a482","source":2,"followers":null,"following":null},{"type":"amazon","url":"http://www.amazon.com/gp/pdp/profile/A22H0VZUIPOS42/","source":2,"followers":null,"following":null},{"type":"amazon","url":"http://www.amazon.com/wishlist/3BJIF5BIXFJ5V","source":2,"followers":null,"following":null},{"type":"angellist","url":"https://angel.co/jason-amster","source":1,"followers":25,"following":null},{"type":"facebook","url":"https://www.facebook.com/amsterjam","source":1,"followers":null,"following":null},{"type":"gravatar","url":"http://www.gravatar.com/a8c17ff3d0ac2dc576987d69d87b911f","source":2,"followers":null,"following":null},{"type":"gist.github.com","url":"http://gist.github.com/36636","source":2,"followers":null,"following":null},{"type":"librelist.com","url":"http://librelist.com/browser/resque/2009/12/3/stale-god/","source":2,"followers":null,"following":null},{"type":"amazon","url":"http://www.amazon.com/wishlist/EAQ4G2NQF7U1","source":2,"followers":null,"following":null},{"type":"gravatar","url":"https://gravatar.com/jasonamster","source":1,"followers":null,"following":null},{"type":"linkedin","url":"https://www.linkedin.com/in/jamster","source":1,"followers":492,"following":492},{"type":"","url":"http://jamster.tumblr.com","source":2,"followers":null,"following":null},{"type":"gist.github.com","url":"http://gist.github.com/148709","source":2,"followers":null,"following":null},{"type":"google","url":"https://plus.google.com/u/0/104885688701467681263","source":1,"followers":13,"following":null},{"type":"facebook","url":"http://www.facebook.com/people/_/695906313","source":2,"followers":null,"following":null},{"type":"google profiles","url":"https://plus.google.com/104108758948182250224/about","source":2,"followers":null,"following":null},{"type":"board.flashkit.com","url":"http://board.flashkit.com/board/printthread.php?t=2439","source":2,"followers":null,"following":null},{"type":"gravatar","url":"http://en.gravatar.com/a8c17ff3d0ac2dc576987d69d87b911f","source":2,"followers":null,"following":null},{"type":"board.flashkit.com","url":"http://board.flashkit.com/board/showthread.php?p=6763","source":2,"followers":null,"following":null}]},

		  //       // Larry Page ( larry.page@gmail.com )
		  //       {"query": "larry.page@gmail.com", "report_info":{"query_id":null,"report_id":"9ac68b89-d444-49b7-83d1-0ef3ce166128"},"bvids":["N_MTg3NDIxNDIwMjky"],"names":[{"full":"Larry Page","parts":{"salutation":"","first_name":"Larry","middle_name":"","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Laurence I Page","parts":{"salutation":"","first_name":"Laurence","middle_name":"I","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Mr Laurence P Page","parts":{"salutation":"Mr","first_name":"Laurence","middle_name":"P","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Lawrence I Page","parts":{"salutation":"","first_name":"Lawrence","middle_name":"I","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Larry I Page","parts":{"salutation":"","first_name":"Larry","middle_name":"I","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Larry P Page","parts":{"salutation":"","first_name":"Larry","middle_name":"P","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Lawrence P Page","parts":{"salutation":"","first_name":"Lawrence","middle_name":"P","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Lawrance I Page","parts":{"salutation":"","first_name":"Lawrance","middle_name":"I","last_name":"Page","suffix":""},"first_seen":"","last_seen":""},{"full":"Laurence Page Lloren","parts":{"salutation":"","first_name":"Laurence","middle_name":"Page","last_name":"Lloren","suffix":""},"first_seen":"","last_seen":""},{"full":"I Laurence Page","parts":{"salutation":"","first_name":"I","middle_name":"","last_name":"Laurence Page","suffix":""},"first_seen":"","last_seen":""}],"emails":[{"email_address":"Larry.Page@google.com","first_seen":"","last_seen":""}],"jobs":[{"company":"Google","title":"","industry":""},{"company":"Google","title":"Co-Founder \u0026 President, Products","industry":""}],"educations":[],"images":[{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/383e386754661aff3bacc582738a9576_6a306606d436654a63a8e7b46244372c59a89cb87b256d995d16b4af445b7405","thumb":"","confidence_score":50,"source":"google"},{"url":"http://lh4.googleusercontent.com/-Y86IN-vEObo/AAAAAAAAAAI/AAAAAAACk4w/yvxY4GMx_8k/photo.jpg","thumb":"","confidence_score":25,"source":""}],"social":[{"type":"google","url":"https://plus.google.com/u/0/ larrypage","source":1,"followers":null,"following":null},{"type":"linkedin","url":"https://www.linkedin.com/in/tlytle","source":1,"followers":null,"following":null}]},

		  //       // Sergey Brin ( sergey.brin@gmail.com )
		  //       {"query": "sergey.brin@gmail.com", "report_info":{"query_id":null,"report_id":"64836605-82b4-46ce-a82d-f18da5b83da6"},"bvids":[],"names":[{"full":"Sergey Brin","parts":{"salutation":"","first_name":"Sergey","middle_name":"","last_name":"Brin","suffix":""},"first_seen":"","last_seen":""},{"full":"Sergey Mikhailovich Brin","parts":{"salutation":"","first_name":"Sergey","middle_name":"Mikhailovich","last_name":"Brin","suffix":""},"first_seen":"","last_seen":""},{"full":"Sergey Mikhaylovich Brin","parts":{"salutation":"","first_name":"Sergey","middle_name":"Mikhaylovich","last_name":"Brin","suffix":""},"first_seen":"","last_seen":""}],"emails":[{"email_address":"sergey.brin@google.com","first_seen":"","last_seen":""}],"jobs":[{"company":"","title":"","industry":"Computer Hardware"},{"company":"","title":"Computer scientist, technology innovator, entrepreneur","industry":""},{"company":"Google","title":"cofounder","industry":""},{"company":"Google Incorporation","title":"Computer scientist, Internet entrepreneur","industry":""},{"company":"","title":"Google Incorporation","industry":""}],"educations":[{"school":"Stanford University","degree":"Alumnus (Master's)","attended":{"start":"1981-01-01","end":"1987-12-31"}},{"school":"University of Maryland University College","degree":"Alumnus (Bachelor's)","attended":{"start":"","end":""}}],"images":[{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/47d0c50b983289bac72fb3d408ec8cdd_3f12c26ef28b092491f115070ab911244731fd8b47db8dd63540537dcf99bfc7","thumb":"","confidence_score":50,"source":"google"},{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/a7f29bd3e1afd3272a34fe2813354519_5c52bc19e9b6da0cb1b3297e9d919248691303e95a18dae9dfe532d58f776e06","thumb":"","confidence_score":50,"source":"linkedin"},{"url":"http://upload.wikimedia.org/wikipedia/commons/5/5f/Sergey_on_China.jpg","thumb":"","confidence_score":25,"source":""},{"url":"http://cs11221.userapi.com/u167274514/a_93fb2a71.jpg","thumb":"","confidence_score":25,"source":""},{"url":"http://cs135.vk.com/u6343955/a_39606c11.jpg","thumb":"","confidence_score":25,"source":""}],"social":[{"type":"amazon","url":"http://www.amazon.com/wishlist/6CM04G0PLFJ5","source":2,"followers":null,"following":null},{"type":"wikipedia","url":"http://en.wikipedia.org/wiki/Sergey_Brin","source":2,"followers":null,"following":null},{"type":"google.com","url":"http://www.google.com/support/forum/p/orkut/thread?tid=38e84b7cd0084900\u0026hl=en","source":2,"followers":null,"following":null},{"type":"us patents app.","url":"http://appft1.uspto.gov/netacgi/nph-Parser?Sect1=PTO1\u0026Sect2=HITOFF\u0026d=PG01\u0026p=1\u0026u=/netahtml/PTO/srchnum.html\u0026r=1\u0026f=G\u0026l=50\u0026s1=\"20070022101\".PGNR.\u0026OS=\u0026RS=","source":2,"followers":null,"following":null},{"type":"vk.com","url":"http://vk.com/id167274514","source":2,"followers":null,"following":null},{"type":"vk.com","url":"http://vk.com/id175961574","source":2,"followers":null,"following":null},{"type":"linkedin","url":"https://www.linkedin.com/in/sergey-brin-106840ab","source":1,"followers":null,"following":null},{"type":"amazon","url":"http://www.amazon.com/gp/pdp/profile/A3AP0RFP8N9535/","source":2,"followers":null,"following":null},{"type":"watermarkfactory.com","url":"http://www.watermarkfactory.com/resources/news/rec.photo.misc/Richard-Scoville-paints-a-happy-face-on-his-little-weewee-and-plays-with-his-only-friend-30336.htm","source":2,"followers":null,"following":null},{"type":"imdb","url":"http://www.imdb.com/name/nm1962236/","source":2,"followers":null,"following":null},{"type":"","url":"http://www.google.com","source":2,"followers":null,"following":null},{"type":"google","url":"https://plus.google.com/u/0/ SergeyBrin","source":1,"followers":null,"following":null},{"type":"vk.com","url":"http://vk.com/id6343955","source":2,"followers":null,"following":null},{"type":"linkedin","url":"http://www.linkedin.com/in/sergey-brin-64194b7","source":2,"followers":null,"following":null}]},

		  //       // Yehuda Katz ( wycats@gmail.com )
		  //       {"query": "wycats@gmail.com", "report_info":{"query_id":null,"report_id":"9eb8f8fc-ec43-4211-832d-a1e5a7b4d975"},"bvids":["N_MTM1OTk2NjY1NQ=="],"names":[{"full":"YEHUDA KATZ","parts":{"salutation":"","first_name":"YEHUDA","middle_name":"","last_name":"KATZ","suffix":""},"first_seen":"","last_seen":""},{"full":"Yehuda Katz","parts":{"salutation":"","first_name":"Yehuda","middle_name":"","last_name":"Katz","suffix":""},"first_seen":"","last_seen":""}],"emails":[{"email_address":"wycats@gmail.com","first_seen":"","last_seen":""}],"jobs":[{"company":"jQuery Project","title":"","industry":""}],"educations":[],"images":[{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/54508cae357b3a2fc43f8cc9d8755f0d_e13a65a3361d1e94cd34191427c8187a68e0be1b84cb8848b474c49f6dc4c8ac","thumb":"","confidence_score":25,"source":"Gravatar"}],"social":[{"type":"quora","url":"http://www.quora.com/wycats","source":2,"followers":0,"following":0}]},

		  //       // Bill Gates ( bill@microsoft.com )
		  //       {"query": "bill@microsoft.com", "report_info":{"query_id":null,"report_id":"5c50c74f-f17c-43a2-8e70-a24861b80ecf"},"bvids":[],"names":[{"full":"Bill Gates","parts":{"salutation":"","first_name":"Bill","middle_name":"","last_name":"Gates","suffix":""},"first_seen":"","last_seen":""},{"full":"William Henry Gates III","parts":{"salutation":"","first_name":"William","middle_name":"Henry","last_name":"Gates","suffix":"III"},"first_seen":"","last_seen":""}],"emails":[{"email_address":"Bill@microsoft.com","first_seen":"","last_seen":""}],"jobs":[{"company":"Microsoft","title":"BOSS","industry":""}],"educations":[],"images":[{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/c04c0e127fd1f4ac0ca5a340faa3a919_9600a8159b11fef6ed0858cd041b9ff807d8da18958791a2537d77c920a3d390","thumb":"","confidence_score":50,"source":"facebook"}],"social":[{"type":"facebook","url":"https://www.facebook.com/jbongio","source":1,"followers":null,"following":null},{"type":"twitter","url":"https://twitter.com/jbongio","source":1,"followers":1113,"following":360},{"type":"linkedin","url":"https://www.linkedin.com/in/juanbongiovanni","source":1,"followers":null,"following":null},{"type":"vimeo","url":"http://vimeo.com/user9463946","source":1,"followers":null,"following":null},{"type":"googleplus","url":"https://plus.google.com/u/0/111558409821694260399","source":1,"followers":null,"following":null},{"type":"foursquare","url":"https://foursquare.com/user/184398","source":1,"followers":null,"following":null},{"type":"pinterest","url":"http://www.pinterest.com/jbongio/","source":1,"followers":150,"following":63},{"type":"myspace","url":"https://myspace.com/3430419","source":1,"followers":null,"following":null},{"type":"flickr","url":"https://www.flickr.com/people/bongio","source":1,"followers":null,"following":null},{"type":"googleprofile","url":"https://plus.google.com/u/0/ jbongio","source":1,"followers":null,"following":null},{"type":"slideshare","url":"http://www.slideshare.net/jbongio","source":1,"followers":null,"following":null},{"type":"gravatar","url":"http://gravatar.com/g2-e22d1711f8e1b0f7b911f2086e33b51d","source":1,"followers":null,"following":null},{"type":"youtube","url":"https://youtube.com/user/jbongio","source":1,"followers":null,"following":null},{"type":"angellist","url":"https://angel.co/tommy-mcnamara","source":1,"followers":2,"following":null}]},

		  //       // Jeff Bezos ( jeff@amazon.com )
		  //       {"query": "jeff@amazon.com", "report_info":{"query_id":null,"report_id":"aeb50ae5-a04c-4a39-8551-b455d5e1f94d"},"bvids":[],"names":[{"full":"Jeff Bezos","parts":{"salutation":"","first_name":"Jeff","middle_name":"","last_name":"Bezos","suffix":""},"first_seen":"","last_seen":""},{"full":"Jeffrey P Bezos","parts":{"salutation":"","first_name":"Jeffrey","middle_name":"P","last_name":"Bezos","suffix":""},"first_seen":"","last_seen":""},{"full":"Bezos Jeff","parts":{"salutation":"","first_name":"Bezos","middle_name":"","last_name":"Jeff","suffix":""},"first_seen":"","last_seen":""}],"emails":[{"email_address":"jeff@amazon.com","first_seen":"","last_seen":""}],"jobs":[{"company":"amazoncom","title":"","industry":""},{"company":"Amazon","title":"Director","industry":""}],"educations":[],"images":[{"url":"https://d2ojpxxtu63wzl.cloudfront.net/static/63163d5e847c527dcb32b46483adaef0_53a5048ff8ca8bff9e4beea2f49db255f4887ba477ebf81220235287a3804641","thumb":"","confidence_score":50,"source":"foursquare"}],"social":[{"type":"myspace","url":"https://myspace.com/115898188","source":1,"followers":null,"following":null},{"type":"twitter","url":"https://twitter.com/jeffdaltonchatt","source":1,"followers":null,"following":null},{"type":"facebook","url":"https://www.facebook.com/jeff.preston.50552","source":1,"followers":null,"following":null},{"type":"foursquare","url":"https://foursquare.com/user/44719647","source":1,"followers":null,"following":null},{"type":"linkedin","url":"https://www.linkedin.com/pub/jeff-bezos/48/85b/415","source":1,"followers":1,"following":1}]}
		  //   ];
		}
	}
    

});
