// "Notoriety EXP Calculator" by TheSeal27

(function() {
	const orig = document.getElementById('NotorietyEXPandInfamyCalculator');
	const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
	const lettersLC = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	
	// const possibleKeys = [80370131870,89746828826,53227524535,41575412533,48098293298,17062665439,37792075804,40563911784,60681654029,12368151863,70368910014,36191212102,24313874344,26306192511,14882253878,69357420085,53074784117,36233641353,31236057805,17016705933,82423804916,51565009403,31396652069,11047920626,17477313906,67251866314,43374114283,14848156580,46678488898,12261194126,53025487322,49619575081,92756746930,78029160710,76979614755,64151631656,49756553184,46204838739,90480421237,49969988544,48743457602,68176016300,69413025981,74359495115,77096870741,47437805540,27687236211,15824366275,79406813557,90870964321,39393753973,48904775032,64022249922,15814813542,56019400852,64471137885,82482802310,79999428027,58444519680,19298202962,19174297856,95941785077,79592736404,94142375986,11721325666,31897670653,36836117724,75114720038,23275763195,24208827436,72497516423,38451229424,33054129661,55169060348,94842747109,97315125266,31431453106,25901164068,48912646148,25744002956,99780925090,69627292509,24459847801,19112929570,84868810206,71236456022,43459089201,46339271410,96835946194,15111996631,80146784999,47167806208,44789364528,75691459657,24426636073,84795944093,20960341664,42168564889,76992794030,70952054909];
	const possibleKeys = ["O55R6DUlgRoB","DbYLlrHF0gVo","ZwfkEErSTNDC","zPVJPlHEIaal","1rmcPOeOEHUJ","bLw1FVmLh1rI","9IykgB3bABTi","g7j2JAx9RSKG","fDSTRgQRJUld","5YXLj07EdNHg","du44CHHmt4LA","Z9wD0EdymQvM","pSy8LQGgSIE4","qNF1DMhleiPa","5BWfFOWmh0lD","b9F1s9VgqQHe","BrHtzpmCTHpd","6MgQxMMIoCVN","LEDGdoFIoMn0","4mg6qQGGZjCy","UuXM7KkFJL95","cR85vlFMNjmc","uYmT1rTA1kbI","fZGUOLNmHxSK","5CHSQHWJ5oDN","unNqrtLW6X2X","iFVVSKydQ3KD","sBX0At9xRbJ4","DivSdjuLeK8l","mH3hRvFxq1oz","yBOFXRhOxEYn","oYQwd4paO7bl","ZpqZziuLJQax","0Fh5n0CFHDzB","SzB9pG68TWIJ","GSHji3VNGZUU","hbDvUiqE946k","wUQkND42PmW4","qqgUqrTkKkZB","Cz9gbSq4qHm0","iMRropPjrRRg","GH4BzFQgBsag","7r4P85Y07433","RuDuoS1GO9vr","pxJUKLSwTgAk","7bOkNmNnJl3m","0QqK4jJvHh8z","nKlkA7yU9ajB","X52SYPJAmC8J","GauEKK7XeCtX","MqVFscCx9ORS","wQ2rfWnGVSbd","LtrfmaN3WM3S","NXCDuJXhCJXM","n8sKog7ABE8L","cyKJ7IjJr8Rz","ig0o5u5QZ4Ov","nJjDq90zyzsC","hnOiDfZfLXbU","F8ruKqb3gIhB","J3RKjwxiCe5x","zzqhGEt4oJ2K","UVis4PTSBUsE","xSHclt48Mw9l","laijWr3jrA2a","35uUzDEyPmLr","WvlVPzV6RP9d","tfQ1q6vH46eO","F7DOsPCiHKB0","KDCMQTjKlMxR","ULATAfRzpoGi","N6cy1USFuNlO","rvkZuZ88hPSv","RPfP6TRoS4oW","0f5cvtiON6Y9","6rKPihluOza7","ZuqpnHJS31dU","wJr9mqlwuG5d","gs3NLg7eOVyJ","JBolLF4TJfHt","ChWoZ1QBFv1p","lhcLDNNPmFBf","ahk8NTeApv5P","Ls43HNj3echg","vBvqj5GLf2mr","VF6JE170jlgp","VoVCcvwQ2v32","2jaHhjMGaf8Y","jZ85nCDHrmXL","SlDgAg62gJ5C","NcIxlB38u4Ow","0PA8ddMPOpBL","TO1navqQhqBs","36M6wsEHGsr4","OdapaxXUA6Zq","K2GtEF9MeBKJ","rh5nCQrozdR3","fAUbSiGLE0NJ","Q84DBpnH4sCD","lfp4rENbfEtv","s0LEUgYNt9Dx","l3qyjt6FsUYL","F1j66uGR65Ew","MTtJyquLkhQL","7qPQhCVAAmcm","vFHiI6sbE7Y0","B74Iqvx7qVAX","13OXShbx18jV","MdT4HgHWUiVg","rPAPB3iSoGC7","NtV7Ez0C2ClP","6JW7IKYKjs75","aYY4cOE2hQn9","VYiEGWYlLxl6","ohhyujQeW2ka","726PNQOQfVGF","Qp6MyzHHjCRU","yUvT5n8cUjPu","bAtKxIf5qldm","6dkeA3woNVWx","AMeymPD2hCeV","IPnqZ6yW2QzI","5ABIfsrqL9do","phJG6kSA7kBO","yk7rSDq01oqY","E9KcvvOVI2Lq","4ObY1Z1KPQB7","CdyskSho6sr2","hz9tDGsUDRXR","XFjSQiHyVX3e","uWHv4LLgH60C","8MJaCplGri4l","WjswzXOYGPfJ","MrCiFacEcMrI","hMjgu7wlJhEJ","VeCvo7dvpvOr","f3cySLTxngXM","docq8fR1YFdY","duNE1e6VXwTy","fMzK4Hb5Adwg","v3X07J14cnPV","KRe6UbHNZ06y","OKNtwV30cfpH","uPEVbX2GT6bm","PqEb3HuJUNal","IXP02bRgj8UP","tWwDkxUN8qbi","iprfF8G6u3d7","YUWZgkSp9f97","f7kXQpdGnc65","GDVTJfz29pvV","fijS5Pmh2hCl","eC88ghaJrCwK","sz0WHNPDvXVa","3wuOmgLr840Z","sYZIfqgPpFFq","iDrLFV3lqoT9","SK34Ivm5BWGY","96Qtxhlk7915","BupzX7crcL2V","WvK1vCj2IpsZ","7e2gDFsaKgD0","73l03ctwZeEq","1DPWIYW45hcw","cKQrr90ha7Ke","RIdgAx4wAI5d","hkf5L5zE9lCZ","TtUzE2C8UYvB","JznzrJuXqU4I","mz0ZTrKnl5mZ","Ry5cbYWZQZ6P","hXdH0oKpodrQ","QMJkzXpbgOTW","P9PSqBUm6v8l","Cmcr96PLESRr","8kR2luTH9R1f","uLz5xD43yrP7","yba8natyu2wK","8l251u48EXdw","YmIVlImOlf2c","GgK46yqzW6mm","BGxAE6TKplaD","RKPnDcvwY5Kg","10gbrvXa7x8t","P17tepFLXOGV","l34QLc2xcZtE","44ZgYNo6fCrk","BRgpoiGY30Pn","mN7LFpI4YAqK","IjULKbtsfZL0","HEz2ZeV3I5JF","rvNMJr6yU9AK","jQtUuGPybAOc","jKqCzL6ujc0L","MBBQ7qduL2sK","ymIXJs1Ydf8t","N0jEebvLA3OR","0xznrbmr77PV","pib5fP9XZALD","ZH72kxYKUYp1","qve5NhsWlHvR","adjGGGPARPY7","nnDdOQSS74VL","96v6iKCknv4e","b00DBtJoKTNA","k5OQDULVRwmi","3LzIQH9aqbfm","Q3P4wRbbmlfm","0PWwIkpZTwwP","rMhdH7KaftEb","xw4nvq8RdqVO","Zrv3rQWZBAO7","zASxzU3jrBNQ","wOftz12voMBR","RpTafjmz1AmX","nR8Td27BkDtb","D4NdE30KHEAo","zqLTa5SVHnSG","8eeQGr2g7fFd","ESSQQb4LlQdd","om5zTtHfAkGm","RBAAFxTLcFyv","Gb55k0rwIbep","0fHybi33Xctc","Qms07zRXs7Xu","KDwgfrwhEgCs","3kwo49i7b5Zh","EgIshFJv5pWT","l1cqtAKxRgZP","00GaPjckCeYq","h7xxKq9XT3y1","GnIY925eAVV7","dqmtrMAW3BWn","WbG3qugDSE5o","moSJodDuyL7Q","Ic8QRIYnkWsi","sTwIekg1UBxQ","CYGdlvjZCfuy","MIxeUEfRNIlM","bt4unI0XsS5G","azmBmZbluwov","RSFSWzHbg2Yx","ErCBNwYXhzYV","jl7BBjRSDlxd","5CYIw1HfGCfn","qXNQaVcKTWnd","jCQeEh5dOse8","ludRA0H8FIjW","FSDaYyNPCZTC","BlegVSpuW3C0","6hsxVYEf23lB","cQfkj8M2Fl2H","vjptLaDvUCxT","iJ4wXLLHEbKh","PSfgpN4c7ld1","DpC3Ok5xkGLx","fmtGrVcqfu1d","b5eJFLHGXqnJ","3DuDc2ZX8Fex","W43qyI62yRDe","JKjj1m4ysnBa","FksQuM2Whm9W","8rSPP34WWNAa","yIKubkJVkkuy","h9CriGMXlJeY","AqwzpFTEijRM","Psxjd7hKrOGV","Xjs7cjNgrSsi","0NwHuG3l2Pb8","szOMgAtlWD6E","Duoa4f884qfJ","2qS2qDrEE8L9","n7GqgY06AAWi","sZk2FSD5NFoS","RYTFlwzFtifY","Bt4DF0wb2sxo","hMnj6aiqdeQF","w1sJfHBRole1","F6C40ENCFdNw","ytfdL1ffb8sK","9PMofA1f01hV","6jOAEkUPy0UA","Dwyw0BboDI2f","q4tnzlVjehZQ","lvILxgXP0TLB","Qs8t7mo9AUcS","PpPfhklMqtin","tR5rnH66RXQU","CrHwPPLbDye8","NxtoeA1eyxBE","JDkDS815l4gG","GsfePKv7iO58","ir2F6F20Vxp4","s6Gwdn3YOOll","pV8XzE3EyrnB","MxrL2cpjJsNS","gEdzgVat7x2P","jOmXtb5bIoK7","djNs8NmqhImx","AD8GkNlGwqY3","KfhHGO8yzkMF","QMaYI9DpFbcz","Vyduvaju9u4T","9G4BsQ5WF1mt","HRbNwxUDXySG","PFoMVulyYS5K","SX2KAlPSLidl","RqfpqNGdnAjj","7prBpha8qaIn","OS6asRo55jtH","Nix51GPO6Aei","Q4hYua1lQKf6","4kMB4Utbqdrt","jAIoaPxkWWB6","EylEdqj9CWi7","Jn3yqob21zHS","9xkYGaaVGOMM","v1xlK0KEVNwI","0lBv9wi5Bba1","VDAEIP6x2mPn","9rPAtwiCcfcq","qOBLF4y3WKBg","172Jel5DPTbJ","JdGjGpT54UYi","nxrFIZ8yGCOR","RLV10DGeTqGf","CnJWZDANFKow","SkT893N7mHhG","swaKBsOVusjA","e1vt7CGZ2F6u","bOnuUBMEAyyB","IlYMuGG5l9b2","YfeY9YcNmclQ","xjBKabVjj1ba","UhTJ6MMzugmz","FKCkq5O9OPKE","ABoBx0NYbQEB","H0VQzU1cZBoP","iaZtQ4auzWJD","tP7yszmnCRwJ","GVVtcGKzTZYP","e5d3lsyYLFUf","PZ2nAGmAJPfL","FA6VgrkYUtIt","NjgxqZjOhEsB","MvQl28yA5oYl","cymLhKOukP33","4jVKNPNF9rXG","6sDYAwBSqMhN","cqZpN7sYmsQ0","YOK9TeShDley","g0RbNdjNyO5Q","6cfNnE2Ql0W6","I9TUGE4RCLVq","Jn3AyWHtm5D4","WbuK98K2lN08","aW25QabZwZhL","53l2oosAW5Gf","5OeDTBU0PCIK","Owobyjl6F99d","4MMVOsvAPcgd","aSbWnHtWkDFK","zi8mnv4rGRfB","bTNt11iz6EXb","JU6b4HoLpiJv","Znydw8CCax3w","0tzYCRfMRRV3","UH4TgrhebhWp","uldi8N8xWFsk","tY77uuvMhFGR","xT55L9ieOQSg","US58zNXhSx0S","aVMhVgimX4pT","2bh1lXxdhptw","0kyjTU19rPUF","roH4DvZk87nD","Jo6p2iLiAvPG","OfiN2R8b3uXL","0Nx3TEk0tfYu","I8nBf1HyELBp","ztxizd0SZhWV","bCny5WTfuVCJ","KPcu9Yqag5cY","9qJnN334snKQ","N2bofwQ2v7MC","7oI0ncykOshn","A7L6WraDmbkp","SFmVcYQx5pzX","EmEd8IRdwJZ2","DYSM1VawjQ48","Q6JxQK7rJUYS","8emJT0w6Tc5e","NXtKB51wB4aX","b2RcMz3VIiwK","nvsaQMnef4pS","vkXZ0521iOMp","JXLTxDAdWseT","8kVg3wvUrztF","K3kri58kyz8X","3B72oEFct6fp","g1mOWpRno2rB","AMzPWprxzH8Q","7nCIBexsgsvx","qDkXyOVmpNTE","v40f7Gyxp6eg","x7mxZvVyGwZ4","0UGLTnUYxD1S","p8S7mvvyvzRy","IGfqzTpCFIfS","O2MO8IWAM4Yw","j18cSRPSbuV5","mlDON3vNMuVC","QY2mZgOgZUnP","VHMoR9YaodvH","XETgB6E10UFa","vt0ZqQNmOdNd","qDuYD79CSJRn","GvGi7mYhOQRe","WSX02NLlXPAH","HmkzAvMijXHI","YCk7VHoeHegz","uy4nDAWW4q5S","V6BGShZ9K6Zr","GMmXn4ztVLpZ","krD50RQR4Cii","IQTOiX6kZEuP","NPaKMUH0URZC","kbBhbRFeSeZV","fVHMDUwoScu4","9ExV6V0PbM8G","DrZ7YB6uCQ4u","N8cZaudFchLG","IpyatGKwGUOZ","W3fu0DHyT4Pi","7FZMQZ2iXypz","FdMC4L4jZPAw","7HrgarLjz7py","g9MkMa69VcbF","RQ28BYk1K5TV","WxbeEuzWbEAb","Jd38GRR4g6C6","DYZ8hCkUmJQO","BEGZmiFDlmIB","fyR5JICBEt8v","3lZESSL6XV87","E1k5iO1XsnqY","wmPrddz1GGiU","myBaPrqvN24R","QbQQoxY3nZXd","1zjFqjA8F75K","8L2JrNu58R9t","9LrUBSPkuOB0","ay3clodUhXwo","CUaMZxCywdhy","bcimQa4bqOzu","WKusmUFDrfLi","TsyzITccFGTR","46GuoehAylpb","ylCCWTZiS2FH","8dbperFI3e1y","fZbF6halp3Qc","6Gn0vlyyIL8A","EKGMn50idBKe","8ZN8YMdT0Ux8","XYBp30svcyxn","EJHxwKq2x24O","Vkwl32UpP3Ze","X77okt5JrKcn","cl4JLxmUwZ4c","8sklcCWP7RDZ","oXiAJaOxNkp1","P77yoCAX66sj","XOkB37l5wA61","bREdyKPy2fLP","cTT2ax5KfRM2","Y0XxHUsqlfMY","y4jjEtNykkhB","Z9znwB7Bcm8q","hG2AoxjDE2Wq","t8efRTf8df0g","Kkc1UXnlsb44","KLOkqoTg4Kyt","miCeHCROdmWJ","M6lKKpUuvMzy","hKNULcnNLHPu","dPp1CLByaAu3","7DVuKp83wVws","eElzSlyNviDL","LBIRL7ZuUJo3","FBdjsQMzi4N6","wN2fhiFJYGhd","WFUWfXvfZ6XZ","ODrpgVgoR1Ae","DgyGizBxgN5W","sSDXrHIn4UcR","01pj8nr4pnLj","TI5YUEtupWXu","WGwZGHO71vhq","uQ2KddVTH0YS","IrZhXJwRCUjd","rdsASoT4Vqnb","jfWEHdkMRiHj","98UoysrHn31H","0XtXZ6DkSRde","sfZrlVr11r7h","eXks0fMR6Rtk","PLzlANNZWi2k","5YRC1c7NZQEn","jjKqfowXdbsI","AELbFDNDWjKd","5bFZ5LBX7Taa","cAz2bWfDee2b","pyKbn849tbk4","dimDZWaEg6gp","8IKf5NZ8ZFf8","YfF3xDkakWh7","zdABdl2WVDio","sSg77qFZ2XYk","dK60ZOEps80W","eEnZcBjWOpg7","3SQxsNlyFHig","VmTBTjiWPf70","2PyExTXNJlHr","nIn6YlGOrnp2","yXK1kl9KdmnS","YbPePMm7YloC","T1iZwtDZweYf","eCCn1dcDDDq7","EMzIYZTk7IwW","t04z3cEi2QXn","KUDHzUypcpIk","l9C36W3WkPwr","AKsv5kazdZTz","CsA8M7GoY0M8","W5P9wsQlCqBN","srBOrBnzR9XV","QX4UE4UEFHfm","jrvBLZtLTKCC","JUj0Isil4tu6","hGQbWITXWnD7","PXu4ATANEX5b","8VuSPweUQXyS","0gWicHVzLvlu","H5cU53UXdo2q","tx6HH7C1pJ23","q0xMEy2lVyYt","05avTKVWwlj2","SPcRb3JlbWS2","Dhae46O9URBm","jCcfFYzEh1yY","C9wHTFEfMwTE","UKpUs9eYeRd9","SWp6VMSuU86Z","InufZh5QZKYn","EmYR0NuUXDjI","6IbTph6FObGK","oHDjofsl2MwZ","8qfn0UgYgP34","H0PvJEN3Qu02","tcaWtAJFkQDV","VHFOTwbYjlKb","j0BL9I2rqUcH","QRyXwEtJRH3u","b1aZjZXARUA0","bff2SMaYxlr8","3tXleK3mbVDG","DlrYW8UVkKx9","zm3zHhS4fAe9","20xjvX0nZ3mO","0AIt9Mqc1FT7","G5wo5JuhNFWe","tpbXvJMlTOxW","cmTAjb0eJCmw","if9nPYtjdC8V","mYCPF38mhIN0","aSCLXdUTOPV5","3NFeU8hccHZm","M45iuM9zFbqN","l0eJqkeHWXQe","F61mHOxnbFO1","PD7RYthqjosQ","C2mKj8xBdc7l","kzDdWWNNzbz7","pGHTKAAOOJwj","f7U6ji3wOHh0","1CX5UBBDHZe9","N3WOUatdiQSf","jBuCG4bjTcSZ","mMXKZEx0Dffj","xFFqM6V3XJQe","8vl4S38pGQKw","UwWOgg8hyI4O","r7KNbWunPViK","m5V0rXKzigx4","HNOIw1zZwElG","wdEHJpdcmyBp","KQGjyIQkcZIZ","u32M2hGb7RJs","0kIwYuK95kgB","SMq47WIDubjh","FJQfwehVdDDB","TxGdWSGEPR4j","ncksSR3QX032","MNOxAJNlq1Ra","fIG5egyOHsqU","FYkgUHBPYjqO","9bA8DidjT1sy","qZu1nZGzjgcq","bb6ehGzgI4OK","uHi44rd3fnAO","SkwkEWQkX0RT","J7iKLMyz3ChK","gcrK6wMCKCzV","ajHdxuvtWYKD","RaumwHP0ux1p","K0qrchd5roRI","yQfaqAEhPotZ","jOP2pnaJJQU3","6JTpLJFuU9wb","xZ1MRPEKa1lL","qJaRRQYjnG6S","HZi8ySn7m08n","obhKELWEfOkM","VMN0Z1w1sKl9","8vWXRawn1bVe","2CeOe8grrD9s","wyTmb16fRtKa","6J5Ffb2Ihruo","L83RlhMM6r9b","Yc60UY5noZ3d","uF4RDnLo51S6","YkXCxmlJ3nJ1","jMe9goZuhHWO","CwLDk1IZphOM","KjSN2zaI0dAJ","l8zIZM42D6EO","0rsmm5PZEbMX","98Q4WHWeObAB","7ot7X6c708Gd","qxsmrzH98xhO","BdzH7kAk3vRX","WYGwhxA0DA4A","ZngII6IBdDrQ","IBtGsLUTfvtY","2KqLWZZxXkAK","jKhMrNyo0FV8","u9oMWJa0etYR","32hpChQq7vKY","yhwYQIKMLxcF","F6gavQZdFxdv","mIv2ie0vuERO","9dZzaMUnFvnb","0vqHyek1QwWF","UQgTZbnHaQi0","AHeOPSqKxcIp","7kvz04XIOmVh","JjSjcrfeEXR8","WD7kN9e74sbh","KyUuYHcZG4WE","WlWXqgRBNQSY","rHOCPEcJyGlG","GV3bpEZAz4uu","7S7nYN3TOR7p","7NmfAmNjJNog","OwKAihoxV3Tp","l21d3yDEXgCx","fcrfsMU4WvuH","g5qJdcbb5zsW","zfHtvlnWuWGz","ht3HQb30Ygjb","WIky9sxRUkuo","0raka7mEs9yM","2QpHGpLnKMx0","dphNlwH186qa","VZMPmvfU3zOI","AE2bSXKl72i3","WvHjMHEvF2Q3","AA06XqX2I29E","XlkRJ960HvqR","24i4ZDrzZ2bi","Wdw6ok3Hi6G1","ndPx0d71271g","QVmGUoNlzkdZ","SW6rQEUqun1e","nAbsKI2wUWw0","iiG1pw05CvVE","qxNoAPZmb3RC","BBZ2erIXejgw","0H4u2uVIHC2L","YhjzdlAkhdHF","YmTW2GW0RwGi","nTmy0DyK6eBS","keO4AjO1NfeH","jEcHv7ZEK1H5","k5PP1YjzAhH2","OPkpIWuvyLv6","hCjUsM9rxBMl","Xxq19N7tEy8r","Rjz19lQze2wC","hDmIIa6vYJFM","aZMxbKMPCozU","tbakscpqJ8Iw","quZ8v0X5aw3i","So89Db8Fivoi","fhwtoA2hd4Gk","VZQOdVC7GkDH","WcSfU45CgShZ","EcpZNx3n9WrG","9GlJiEsFkm01","mKCS8dR0FUZy","w7afuONpMZCi","euT6lkGBlEaM","n9O40vpM8VlH","hTK0r8p6Eeas","jGQotc4qgnyU","BQwdxNZT2mu6","cwGjg5mlguzC","EDNA2GxjfSHu","EnSH13hWK2kj","gklwDmMrbrc5","8JXCvfyxTaR2","njsOppV9h1Cd","4d5QWxSPuKpF","OiIrL0KUgIIp","Yv1CJh3vJ31k","XwmyIhkcuyXj","xi7yhEJSQ03k","SstVoWAtgabL","KIZ8Q2vBy8bf","XhZMEqVoPMJs","HcHj7tQgZw56","bssM6ayvFSiI","dTOcQ9HPvHGv","JkCfnZRbxVnn","M4Q2v5mXTmX4","ihhLJcHrgVvs","BUAHTRu0oAkE","a1NBjUje0K0A","G8kaPoUTSr9h","lX99wQv964sl","cquxV4YG6HZN","plTfdch3YqqL","p1YVm53npAWw","4gWoNtpFL7NV","jjw5ptUc4ymv","NLJ6RgF44bJ8","Dipmf3MMJCup","5Xj3lC2RvVMV","0P7ER7i4Tgrn","F6eTIPZBMzDa","6TZFpNxSfPlE","WMkGLcsFWY4Y","VPCTeyu03zHj","tCvF0wRV32p2","zrYRPAAEbyrD","dqZEz7jMplww","B1OTCAATyokh","RnIrXSNI1TdX","yrzIfW9FZIzz","azEDlmAY1y6L","wioViVNd52Uu","8PheKfc6uAmr","Uvjw8jDnU1S6","hHpUEVqpyznl","jP4eplHYIf5A","jtBDhpUQAyA4","Y8r3VBk0haQd","dGLaN1rJyocq","efAHo9el5WNL","qTexOqvi8osL","v8eLDwGT7fyr","PtOIm3w5VH2w","uH2LmKsL1Pxp","RF2lhUNM9wu1","TfD7vPYDRT8A","6NiyqqoO4I3z","97xHRchUH6Nd","gSUC7qjApW7x","uwPwUDLy5Gs8","QodsX4Pl1BDu","4MU5gInf92A5","V2KHEdplWXes","ADHILwI3pb94","lvG2SEzzNJsX","OJE0FEVtkrOf","3ShR0wLMrKm9","Sn1XJMjWvZfN","2DwQPUZSW85t","WUjJZVF7ODX5","s3MtLJ0fucvC","M4FV72X49Yz4","qYpZyAXIvVdL","HqCMmpDPZRxb","BMElLrM0qxVN","6otGvGAQYicl","K4lRpxs6EgLJ","r3FI4rlrmQ5e","vao15Tajs3KM","83yATrAtpbe5","5COYzelZGDgs","XxrN9vIKfEv2","YHgQ4Ss5jTzm","DlYqozjtbBPe","i8SHTfQoyRzw","ViM04Mh7KzuD","kDfewicm1vZH","4UKMGx4zIYtX","G3ysdb1TaSml","3Hqn8PwCYVu8","DYZoOWF6n3g1","sbLuNt3nWYV6","YCG4YLKTRxUw","iEyoXXgZ8im7","Xr9jMhzPGabP","XtvgrbbdDzOp","PwRULYy5Pi3u","0Y08kUIVvt1z","AfKuI7vxgdmc","o7QnPuHr2uqB","yZt9ztKI3i3I","Pg7WJAqVwKns","UerXFI3LTN61","4XRt9AQbUudM","xVJ0ihyYAl2W","zMPCq9uWRVxD","6FL5SfZ9P3Vu","XuNV98WjAgJS","DAOrz4ptTW4h","9MdiYHsfq3za","chYaB4SwJrmi","5PihmUKSDS8l","UIxphUBKKteB","Y69XBdUoVDQW","4zSVWm4ENqmd","OzXJM0y9cCJe","C1Z46goYXJP3","CsUlX74KeJGA","uDEFpohJkS6k","2ID1T8lKxIVk","o9uHQEhkiQK8","PtUj9hhdj3Xu","qCiBM093wjTV","WjQCElRDuhSI","RR5FrQhXfWhm","qA2rEzO9HmZT","F3EwFKbIZnxy","p1KOHWWFmjxZ","MFtWZLSG5L1P","60zj2nguOsY1","yVA9YzknKhxo","CUW4hw1wjssL","li44q80gMrGR","Qokit1HPN2cT","AssrHGdittqj","le30INiiUdfP","BQIR8yKNeYRB","FVFTMM0KMbFA","SdHJWlxnzTnE","xjmkqeKVlwMk","RYBY1ijUgHPA","KRdicu3rxGsH","cqQB9IMGH48K","3v3A9Nr7Aw20","zoEnF8rxFAoE","nt11vLzxwujA","x11NEx74yIVa","1gbc5jUUAfEI","QUd7mrPnb5Fy","RDGPZam5r6zM","R1trU9410rg2","2GsJQ18Smn6L","Ldf7T1zU2DzA","2En2mgvleRHS","8W1HlIPRznke","hbc7fRpaOzA8","5R1EiXVaiCR3","jjj6GkR9yvil","JwjGgAoJeyCn","Gs3ywjNAlQQu","tKyZfXCCfAbh","VRTRnCmCIZ4U","M4w6gnOqS5VH","pnh8Op7soGfF","ybHXS3xxhV5l","WitVAaFiadv2","zjpn61z0vrgO","jgsaapUOsEcF","MpQUjohisymW","VEgdeHeK6WA8","w1ItMl4ATke1","6PP0MlIxYNOq","0mTWuDUe8MOu","M56VWtrVVrrO","TqZaLWf30WWs","TxEMTKkBEykP","yaW1A0Xo6lpA","VcNDfuaDoMYg","AXhubPVMJaA2","eXZJFN7UXYdZ","RDWbyVX5eSRn","rZ2AV821L59v","uQcMvvZNxByV","wYKNAtJT7TEY","Iw3oozXIOgwC","cSyWcQtDogTn","JCZ4T1pKV872","yqpmEcVdQJBV","PDIsHc2Lj2RY","b2ypZb5lskUD","MoXQihA8dEqx","1jFh17LemvPd","cZdiU1DUPrc8","fZJUYAhUJ5JN","n0khLo6hWO40","z1FG7GZSUzNz","LfxT0qZiKYs9","PErQfc9S0TPS","12aGfoCJ3Ojv","aze3FH1le8H5","NSUQMrzarLud","3slfCHXfu6Hq","VdCaEZC6CIFD","Ycvwfbe2oRvN","1xWfVKPU1f2o","yC5XA5rx5m8Y","Dg9SVxFIs4Bu","Hb3CMscg0igG","8MGVQxaCkd1B","CaMgu28s9a7Q","8dC2OyZV3Sox","TENLoDC2AC6m","XMaQRJ4D8ar0","LS79ERoSLhbd","qdmJWJO9aPYZ","43bgSj8ZJbI6","kKCi5MxwCe2q","ro9sjWyB0jYk","kMCgPjQETVKY","5tw172qvaFCp","KPXEa14Q1h9D","nPQFvXtpV2t7","4s7tKDE9XYEN","yY0C36i0P8e9","GA5WEYOabPiO","b9ZBxHENpB5a","w1IEpk1VwYBO","qX9B95uGR7wc","0VJviQ0Muv9R","3Lhvnm3KVERF","6ZE5VPwSOfoc","u7wqT7nXVJm7","8rit6kDNlaRr","L6EGTZ7DfAYS","YA7BuMKFvL1R","4kT3VImFtNeB","i1NGtYbIwPF2","35X1kzTA1EA3","8iEKDN0fJKxZ","UlaaT5ZED8ul","4Yg3xsoHTaoL","lWnWxBZSUeEs","ZSj4y4odeVB7","477BFQlVQ2uH","pXwfVRrTxEuJ","ruGs7C19aK3L","Atk6b3WNM9WM","TcaFopXE2s9Q","cdpEvgi3mtY3","XPqjK4bwA5u1","cmGQegyh8FEY","sok7Bd8SA1Lu","afjwLWtnXEYA","jR7LzgpwisZK","cl0YjhNXk7ce","GEKP9lGbSs71","uhTd6aki4O4M","JTMvhB1RSvH7","nBaYRJ1RDP8U","E6mljH7V8nqE","u4qyWOZtjpsw","3DmjSjE4Zjkv","ssBKaoYvLJvW","m7yLJiUuMpOq","Y9W0pZaQbkZh","QeMMkot076o3","bcScdBNRa0Ol","UT13tvrNG25N","b8X6RRBsY8H4","mNoOyNzclfJq","CrXmJFxiFSJJ","e2CtkZ8GFGAB","deSWNYn6W6pM","oZrqutoCZ11l","T8k71otoP1pw","6eewiBXp39nR","LQ1y3SH9Mop4","1C5eM7nCa1QV","JBilulDReZDT","iBwvQAA1Ypxu","kA3RbtOvHJHj"];
	const randomKey = possibleKeys[randomBetween(0, possibleKeys.length)];
	// const validKeys = ["It's not going to be that easy!"];
	const validKeysInterpretation = [75879, 25220, 63, 93049];
	
	function interpretKey(input) {
		var output = 0;
		if (input != null) {
			const characters = [];
			var remainingInput = input;
			var numA = 0;
			var numB = 0;
			for (var x = 0; x < input.length; x++) {
				characters.push(remainingInput.match(/./)[0]);
				remainingInput = remainingInput.replace(/./, '');
				if (letters.indexOf(characters[x]) != -1 || lettersLC.indexOf(characters[x]) != -1) {
					if (letters.indexOf(characters[x]) != -1) {
						numA += (1 + lettersLC.indexOf(characters[x].toLowerCase())) * 5;
					} else if (lettersLC.indexOf(characters[x]) != -1) {
						numA += (1 + lettersLC.indexOf(characters[x].toLowerCase())) * 2;
					}
				}
				if (Number(characters[x]) >= 0) {
					numB += (Number(characters[x]) * Math.floor(Number(characters[x]) ** 1.2 + 1));
				}
			}
			output = Math.floor((numA + numB) / 8) + (numA * numB);
		}
		return output;
	}
	if (validKeysInterpretation.indexOf(interpretKey(window.localStorage.getItem('NotorietyEXPCalculator_TesterGatekeep_CodeUsed'))) != -1) {
		console.log('Entered correct tester access key: ' + window.localStorage.getItem('NotorietyEXPCalculator_TesterGatekeep_CodeUsed'));
	} else {
		orig.style.display = 'none';
		setTimeout(function() {
			orig.insertAdjacentHTML("beforeend", "<div id='NotorietyEXPandInfamyCalculator_TesterGatekeep'></div>");
			orig.style.display = '';
			orig.getElementsByTagName('div')[0].style.display = 'none';
			orig.getElementsByTagName('div')[0].remove();
			doTheStuff();
		}, 0);
		
	function doTheStuff() {
	
	function hideMainTool() {
		orig.style.display = 'none';
		document.getElementById('NotorietyEXPandInfamyCalculator_TesterGatekeep').style.display = '';
	}
	function hideTesterAccess() {
		orig.style.display = '';
		document.getElementById('NotorietyEXPandInfamyCalculator_TesterGatekeep').style.display = 'none';
	}
	const testerCode = document.createElement('p');
	testerCode.innerHTML = "<h1>Tester access only!</h1>Input your access code:<br><input id='NotorietyEXPandInfamyCalculator_TesterGatekeep_CodeInput'></input> <button id='NotorietyEXPandInfamyCalculator_TesterGatekeep_CodeInputSubmit'>Enter</button><br>Attempts remaining: <span id='NotorietyEXPCalculator_TesterGatekeep_CodeAttemptsRemaining'></span>";
	document.getElementById('NotorietyEXPandInfamyCalculator_TesterGatekeep').appendChild(testerCode);
	
	const testerCodeSubmit = document.createElement('button');
	const maxAttempts = 5;	
	var attempts = Number(window.localStorage.getItem('NotorietyEXPCalculator_TesterGatekeep_CodeAttempts'));
	var attemptsRemaining = maxAttempts - attempts;
	
	document.getElementById('NotorietyEXPandInfamyCalculator_TesterGatekeep_CodeInputSubmit').addEventListener('click', function() {
		if (document.getElementById('NotorietyEXPandInfamyCalculator_TesterGatekeep_CodeInput').value != '' && attemptsRemaining > 0) {
			if (validKeysInterpretation.indexOf(interpretKey(document.getElementById('NotorietyEXPandInfamyCalculator_TesterGatekeep_CodeInput').value)) != -1) {
				window.localStorage.setItem('NotorietyEXPCalculator_TesterGatekeep_CodeUsed', document.getElementById('NotorietyEXPandInfamyCalculator_TesterGatekeep_CodeInput').value);
				attempts = 0;
				location.reload();
			} else {
				attempts++;
				window.localStorage.setItem('NotorietyEXPCalculator_TesterGatekeep_CodeAttempts', attempts);
			}
			if (attempts == 0) {
				attemptsRemaining = maxAttempts;
			} else {
				attemptsRemaining = maxAttempts - attempts;
			}
			document.getElementById('NotorietyEXPCalculator_TesterGatekeep_CodeAttemptsRemaining').innerHTML = attemptsRemaining;
		}
	});
	
	document.getElementById('NotorietyEXPCalculator_TesterGatekeep_CodeAttemptsRemaining').innerHTML = attemptsRemaining;
	}
	}
}());

(function() {
	function NotoExpReqTotal(base, goal) {
		base = new Decimal(base).abs();
		goal = new Decimal(goal).abs();
		const count = goal.sub(base).abs();
		var sum = new Decimal(0);
		for (var x = 0; count.greaterThan(x); x++) {
			var currentLvl = base.add(x);
			sum = sum.add(currentLvl.times(new Decimal(1018.93)).add(currentLvl.pow(2.976664)).floor());
			// sum += ( Math.floor(currentLvl*1018.93+currentLvl**2.976664) );
		}
		return sum;
	}
	// console.log(NotoExpReqTotal(1, 100));
	
	var tool_baseHTML = "<div style='background:linear-gradient(rgba(44,0,66, var(--bg-alpha)), rgba(57,0,85, var(--bg-alpha)), rgba(69,0,102, var(--bg-alpha)), rgba(57,0,85, var(--bg-alpha)), rgba(44,0,66, var(--bg-alpha)));text-align:center;width:80%;margin:auto;padding:1em'><div class='StandardText' style='font-size:100%'><span style='font-size:200%'>Notoriety EXP Calculator<br><span style='font-size:70%'>(v0.0.1 testing)</span></span><p>A tool for the Roblox game <a href='https://www.roblox.com/games/21532277'>Notoriety</a>'s EXP, Infamy and MXP features<br>Tool created by TheSeal27</p></div><br>";
	(function() {
		tool_baseHTML += "<center style='height:4em' id='NotorietyEXPandInfamyCalculator_MenuButtons'></center><hr/>"
		tool_baseHTML += "<div id='NotorietyEXPandInfamyCalculator_MenuContainer_Calculator'></div>"
		tool_baseHTML += "<div id='NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous'></div>"
		tool_baseHTML += "</div>"
	}());
	
	document.getElementById('NotorietyEXPandInfamyCalculator').innerHTML = tool_baseHTML;
	
	(function() {
		var tool_baseHTML_MenuContainer_Calculator = '';
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputSliders_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleInputSliders_Global' style='cursor:pointer;float:left;text-decoration:underline'>Input method: Sliders</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleRomanNumerals_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleRomanNumerals_Global' style='cursor:pointer;float:left;text-decoration:underline'>Roman numerals: ON</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputExplanations_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleInputExplanations_Global' style='cursor:pointer;float:left;text-decoration:underline'>Input explanations: Visible</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleComputationType_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleComputationType_Global' style='cursor:pointer;float:left;text-decoration:underline'>Computing: EXP, Levels & Infamy</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInfiniteInfamies_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleInfiniteInfamies_Global' style='cursor:pointer;float:left;text-decoration:underline'>Maximum infamies: 250</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleAutoCalculate_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleAutoCalculate_Global' style='cursor:pointer;float:left;text-decoration:underline'>Auto calculate: OFF</div><br></small>";
		tool_baseHTML_MenuContainer_Calculator += "<small id='NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleTimeOutputFormat_Global'><div id='NotorietyEXPandInfamyCalculator_ToggleTimeOutputFormat_Global' style='cursor:pointer;float:left;text-decoration:underline'>Time output format: words</div><br></small>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_LevelSettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Level Settings</h2>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentLevelInput'>Current level: <input type='range' min='1' max='100' value='1' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_CurrentLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_CurrentLevelInput_Result'>1</span></code></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_RemainingEXPInput'>Remaining EXP: <input type='range' min='0' max='999999' value='0' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_RemainingEXPInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_RemainingEXPInput_Result'>0</span></code><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(This is EXP remaining until the next level.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_GoalLevelInput'>Desired level: <input type='range' min='1' max='100' value='1' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_GoalLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_GoalLevelInput_Result'>1</span></code></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_MutatorRankSettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Mutator Rank Settings</h2>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentMutatorRankInput'>Current rank: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_CurrentMutatorRankInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(Starting rank is 0.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_RemainingMXPInput'>Remaining MXP: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_RemainingMXPInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(This is MXP remaining until the next level. Leave blank if no progress has been made.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_GoalMutatorRankInput'>Desired rank: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_GoalMutatorRankInput'></input></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_UntilMXPUsageInput'>Until MXP usage: <input style='width:4em' id='NotorietyEXPandInfamyCalculator_UntilMXPUsageInput'></input><br><span style='font-size:80%'><span class='NotorietyEXPandInfamyCalculator_InputExplanation'><br>(Search for which Mutator Rank can be achieved using this much MXP. Overrides the 'Desired rank' setting.)</span></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_ProgressionSettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Progression Settings</h2>";		
		tool_baseHTML_MenuContainer_Calculator += "<p>Run/rotation gains:<br><textarea style='width:20em;height:10em' placeholder='temporary text' id='NotorietyEXPandInfamyCalculator_RunGainsInput'></textarea><span id='NotorietyEXPandInfamyCalculator_RunGainsInput_InputExplanation' class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'>placeholder text</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_InfamySettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Infamy Settings</h2><small>If not calculating infamies, then <span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPandInfamyCalculator_SectionContainerToggle_InfamySettings'>ignore these settings</span>.</small>";
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_SectionContainer_InfamySettings'>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentInfamyLevelInput'>Current infamy level: <input type='range' min='0' max='250' value='0' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput_Result'>0</span></code></span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_GoalInfamyLevelInput'>Desired infamy level: <input type='range' min='0' max='250' value='0' class='slider' style='width:10em' id='NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput'></input><br><span style='font-size:80%'>Value: <code><span id='NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput_Result'>0</span></code><br>(Until out of money: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_UntilPoorCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPandInfamyCalculator_InputExplanation'> (Overrides 'Desired infamy level' setting and requires 'Run/rotation gains' to be properly defined.)</span>)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CurrentMoneyInput'>Current money: <input style='width:10em' id='NotorietyEXPandInfamyCalculator_CurrentMoneyInput'></input><span class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'><br>(This is the money that has been reserved for infamy. Default is <code>0</code>. Required setting when 'Desired infamy level' > 'Until out of money' is set to <code>Y</code>.)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_CheaperPassCheck'><a href='https://www.roblox.com/game-pass/748016'>Cheaper Infamy</a> gamepass: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_CheaperPassCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'><br>(Whether or not the user owns the Cheaper Infamy gamepass, which reduces the final monetary requirement of each infamy by 50%.)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p id='NotorietyEXPandInfamyCalculator_Block_PreMoneyReqLimitCheck'>Pre-money requirement limit: <span style='width:4em;height:4em;display:inline-block'><button class='customCheckbox NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_PreMoneyReqLimitCheck' style='cursor:pointer'>[N]</button></span><span class='NotorietyEXPandInfamyCalculator_InputExplanation' style='font-size:80%'><br>(This setting refers to the post-infamy 25 increasing infamy money requirement (+$10mil without cheaper pass, +$5mil with), which previously (prior to 3.9.5b on 2024-12-27T16:10Z) did not have a limit of $125mil without cheaper pass (or $62.5mil with).)</span></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		tool_baseHTML_MenuContainer_Calculator += "<div id='NotorietyEXPandInfamyCalculator_Section_Results'>";
		tool_baseHTML_MenuContainer_Calculator += "<hr/><h2>Results</h2>";
		tool_baseHTML_MenuContainer_Calculator += "<p><div><p id='NotorietyEXPandInfamyCalculator_Section_Results_Disclaimer' style='font-size:80%'>placeholder!!!</p><div style='width:10em;height:4em;margin:auto'><div style='margin:auto'><button class='NotorietyEXPCalculatorButton' id='NotorietyEXPandInfamyCalculator_CalculateButton' style='cursor:pointer;background:rgba(124,76,147,var(--bg-alpha))'>Calculate</button></div></div></div></p>";
		tool_baseHTML_MenuContainer_Calculator += "<p><div id='NotorietyEXPandInfamyCalculator_OutputResults'>" + 'dallas medic bag scream' + "</div></p>";
		tool_baseHTML_MenuContainer_Calculator += "</div>";
		
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Calculator').innerHTML = tool_baseHTML_MenuContainer_Calculator;
	}());
	
	(function() {
		var tool_baseHTML_MenuContainer_Miscellaneous = '';
		
		tool_baseHTML_MenuContainer_Miscellaneous += "<div id='NotorietyEXPandInfamyCalculator_Section_UpdateLogs'>";
		tool_baseHTML_MenuContainer_Miscellaneous += "<h2>Hall of CCLs</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPandInfamyCalculator_SectionContainerToggle_HallofInfamyCCLs'>(toggle visibility)</span></small>";
		tool_baseHTML_MenuContainer_Miscellaneous += "<div id='NotorietyEXPandInfamyCalculator_SectionContainer_HallofInfamyCCLs' style='text-align:initial;display:none'>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		
		tool_baseHTML_MenuContainer_Miscellaneous += "<hr/><h2>Update Logs</h2><small><span style='text-decoration:underline;cursor:pointer' id='NotorietyEXPandInfamyCalculator_SectionContainerToggle_UpdateLogs'>(toggle visibility)</span></small>";
		tool_baseHTML_MenuContainer_Miscellaneous += "<div id='NotorietyEXPandInfamyCalculator_SectionContainer_UpdateLogs' style='text-align:initial;display:none'>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		tool_baseHTML_MenuContainer_Miscellaneous += "</div>";
		
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous').innerHTML = tool_baseHTML_MenuContainer_Miscellaneous;
	}());
	
	const elem = {
		toggleInputSliders_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputSliders_Global'),
		toggleRomanNumerals_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleRomanNumerals_Global'),
		toggleInputExplanations_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInputExplanations_Global'),
		toggleComputationType_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleComputationType_Global'),
		toggleInfiniteInfamies_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleInfiniteInfamies_Global'),
		toggleAutoCalculate_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleAutoCalculate_Global'),
		toggleTimeOutputFormat_Global_Container: document.getElementById('NotorietyEXPandInfamyCalculator_MainSettingContainer_ToggleTimeOutputFormat_Global'),
		
		toggleInputSliders_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleInputSliders_Global'),
		toggleRomanNumerals_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleRomanNumerals_Global'),
		toggleInputExplanations_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleInputExplanations_Global'),
		toggleComputationType_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleComputationType_Global'),
		toggleInfiniteInfamies_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleInfiniteInfamies_Global'),
		toggleAutoCalculate_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleAutoCalculate_Global'),
		toggleTimeOutputFormat_Global: document.getElementById('NotorietyEXPandInfamyCalculator_ToggleTimeOutputFormat_Global'),
		
		Section_LevelSettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_LevelSettings'),
		Section_MutatorRankSettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_MutatorRankSettings'),
		Section_ProgressionSettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_ProgressionSettings'),
		Section_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_InfamySettings'),
		Section_Results: document.getElementById('NotorietyEXPandInfamyCalculator_Section_Results'),
		Section_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_Section_InfamySettings'),
		Section_UpdateLogs: document.getElementById('NotorietyEXPandInfamyCalculator_Section_UpdateLogs'),
		
		SectionContainer_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainer_InfamySettings'),
		SectionContainer_UpdateLogs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainer_UpdateLogs'),
		SectionContainer_HallofInfamyCCLs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainer_HallofInfamyCCLs'),
		
		SectionContainerToggle_InfamySettings: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainerToggle_InfamySettings'),
		SectionContainerToggle_UpdateLogs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainerToggle_UpdateLogs'),
		SectionContainerToggle_HallofInfamyCCLs: document.getElementById('NotorietyEXPandInfamyCalculator_SectionContainerToggle_HallofInfamyCCLs'),
		
		currentLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentLevelInput'),
		remainingEXPInput: document.getElementById('NotorietyEXPandInfamyCalculator_RemainingEXPInput'),
		goalLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_GoalLevelInput'),
		currentInfamyLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput'),
		goalInfamyLevelInput: document.getElementById('NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput'),
		
		currentMutatorRankInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentMutatorRankInput'),
		remainingMXPInput: document.getElementById('NotorietyEXPandInfamyCalculator_RemainingMXPInput'),
		goalMutatorRankInput: document.getElementById('NotorietyEXPandInfamyCalculator_GoalMutatorRankInput'),
		untilMXPUsageInput: document.getElementById('NotorietyEXPandInfamyCalculator_UntilMXPUsageInput'),
		
		runGainsInput: document.getElementById('NotorietyEXPandInfamyCalculator_RunGainsInput'),
		runGainsInput_InputExplanation: document.getElementById('NotorietyEXPandInfamyCalculator_RunGainsInput_InputExplanation'),
		
		currentMoneyInput: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentMoneyInput'),
		
		currentLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentLevelInput_Result'),
		remainingEXPInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_RemainingEXPInput_Result'),
		goalLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_GoalLevelInput_Result'),
		currentInfamyLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_CurrentInfamyLevelInput_Result'),
		goalInfamyLevelInputResult: document.getElementById('NotorietyEXPandInfamyCalculator_GoalInfamyLevelInput_Result'),
		
		untilOutOfMoneyCheck: document.getElementById('NotorietyEXPandInfamyCalculator_UntilPoorCheck'),
		cheaperPassCheck: document.getElementById('NotorietyEXPandInfamyCalculator_CheaperPassCheck'),
		preMoneyCapCheck: document.getElementById('NotorietyEXPandInfamyCalculator_PreMoneyReqLimitCheck'),
		
		resultsDisclaimer: document.getElementById('NotorietyEXPandInfamyCalculator_Section_Results_Disclaimer'),
		calculateButton: document.getElementById('NotorietyEXPandInfamyCalculator_CalculateButton'),
		outputResults: document.getElementById('NotorietyEXPandInfamyCalculator_OutputResults'),
	}
	
	function addHallofInfamyCCLs() {
		elem.SectionContainer_HallofInfamyCCLs.innerHTML = '';
		const countCCLs = 28;
		var string = "<p style='text-align:center'>Times are noted in the local system time in <b>year-month-day 24hour:minute:second</b> format. Entries may take some time to be added, especially depending on available data. There are currently many missing user-written descriptions. If you wish for modifications to be made to your entry, or want it to be anonymised, contact the tool creator on Discord (same username).</p>";
		function Player(username, displayName, robloxAvatar, whenCCL, timeSincePrevious, position, notes) {
			this.username = username;
			this.displayName = displayName;
			this.robloxAvatar = robloxAvatar;
			this.whenCCL = whenCCL;
			this.timeSincePrevious = timeSincePrevious;
			this.position = position;
			this.notes = notes;
		}
		const players = [];
		const playersData_usernames = [
		"ILikeToast5",
		"Derpifi3d",
		"withwillin101",
		"Aurora_The1Cat",
		"seroly2345",
		"theREALdynamic",
		"bigfootbb045",
		"LuvlyGirlMaisy",
		"ARandomNoobGamer",
		"Ryankaye01",
		"kogamarobloxman",
		"ALiteraIPotato",
		"cl3rical",
		"T4x_Ev4der",
		"notrealdude755",
		"Kurvinox_PL",
		"SwiftYards",
		"Danneilkoko",
		"Cut1eBetty",
		"IceColdFrigid",
		"TexudeoSteve",
		"ilovebaconflavor",
		"LeRealShadowflame",
		"Benja_boy64",
		"GenericDreamer",
		"M4kA13",
		"Aimilized",
		"LosCracks9000",
		];
		const playersData_displayNames = [
		"ILikeToast5",
		"Derp",
		"withwillin",
		"Little_Fluffy1Cat",
		"Siro",
		"Dynamic",
		"thefemurbreaker",
		"maisy",
		"NoobLol",
		"Ryeon",
		"stix",
		"ALiteralPotato",
		"cleric",
		"私の睡眠マヒの悪魔は私を攻撃し続ける",
		"notrealdude755",
		"Pola",
		"Swift",
		"Iron",
		"CutieBetty",
		"Ice",
		"Steve",
		"qwe",
		"Shadowflame",
		"iforgor",
		"GenericDreamer",
		"m4ka",
		"Aimilized",
		"NekoChan",
		];
		const playersData_robloxAvatars = [
		"ILikeToast5 - 2025-04-10T22-03Z.png",
		"Derpifi3d - 2025-04-10T22-04Z.png",
		"withwillin101 - 2025-04-10T22-04Z.png",
		"Aurora_The1Cat - 2025-04-10T22-04Z.png",
		"seroly2345 - 2025-04-10T22-05Z.png",
		"theREALdynamic 2025-04-10T22-05Z.png",
		"bigfootbb045 - 2025-04-10T22-05Z.png",
		"LuvlyGirlMaisy - 2025-04-10T22-05Z.png",
		"ARandomNoobGamer - 2025-04-10T22-06Z.png",
		"Ryankaye01 - 2025-04-10T22-06Z.png",
		"kogamarobloxman - 2025-04-10T22-06Z.png",
		"ALiteraIPotato - 2025-04-10T22-06Z.png",
		"cl3rical - 2025-04-10T22-07Z.png",
		"T4x_Ev4der - 2025-04-10T22-07Z.png",
		"notrealdude755 - 2025-04-10T22-07Z.png",
		"Kurvinox_PL - 2025-04-10T22-07Z.png",
		"SwiftYards - 2025-04-10T22-08Z.png",
		"Danneilkoko - 2025-04-10T22-08Z.png",
		"Cut1eBetty - 2025-04-10T22-08Z.png",
		"IceColdFrigid - 2025-04-10T22-08Z.png",
		"TexudeoSteve - 2025-04-10T22-09Z.png",
		"ilovebaconflavor - 2025-04-10T22-09Z.png",
		"LeRealShadowflame - 2025-04-10T22-09Z.png",
		"Benja_boy64 - 2025-04-10T22-09Z.png",
		"GenericDreamer - 2025-04-10T22-10Z.png",
		"M4kA13 - 2025-04-10T22-10Z.png",
		"Aimilized - 2025-04-11T19-35Z.png",
		"LosCracks9000 - 2025-04-13T00-14Z.png",
		];
		const playersData_whenCCL = [
		{approx:false, timestamp: "2025-01-01T10:04:35Z"},
		{approx:'within hours', timestamp: "2025-01-11T00:00Z"},
		{approx:'within minutes', timestamp: "2025-01-11T05:20Z"},
		{approx:'within many hours', timestamp: ["2025-01-17T13:00Z", "2025-01-17T19:00Z"]},
		{approx:'within hours', timestamp: "2025-01-21T02:33Z"},
		{approx:'within many hours', timestamp: ["2025-01-24T18:00Z", "2025-01-25T12:00Z"]},
		{approx:'within minutes', timestamp: "2025-01-30T02:23Z"},
		{approx:'within hours', timestamp: "2025-02-04T20:05Z"},
		{approx:'within minutes', timestamp: "2025-02-09T10:30Z"},
		{approx:'within seconds', timestamp: "2025-02-16T02:40:39Z"},
		{approx:'within hours', timestamp: "2025-02-21T17:00Z"},
		{approx:'within seconds', timestamp: "2025-02-21T19:41:58Z"},
		{approx:'within minutes', timestamp: "2025-02-24T01:16Z"},
		{approx:'within hours', timestamp: ["2025-02-27T02:00Z", "2025-02-27T03:42Z"]},
		{approx:'within minutes', timestamp: "2025-02-28T13:22Z"},
		{approx:'within hours', timestamp: ["2025-03-01T18:15Z", "2025-03-01T22:45Z"]},
		{approx:'within many hours', timestamp: ["2025-03-08T06:47Z", "2025-03-08T12:18Z"]},
		{approx:'within hours', timestamp: ["2025-03-10T13:25Z", "2025-03-10T15:57Z"]},
		{approx:'within many hours', timestamp: ["2025-03-12T14:14Z", "2025-03-12T21:10Z"]},
		{approx:'within seconds', timestamp: "2025-03-13T23:59:04Z"},
		{approx:'within seconds', timestamp: "2025-03-20T01:35Z"},
		{approx:'within minutes', timestamp: "2025-03-20T02:10Z"},
		{approx:'within minutes', timestamp: ["2025-03-25T03:24Z", "2025-03-25T03:57Z"]},
		{approx:'within many hours', timestamp: ["2025-03-29T11:33Z", "2025-03-30T03:12Z"]},
		{approx:'within hours', timestamp: ["2025-04-01T07:35Z", "2025-04-01T10:57Z"]},
		{approx:'within hours', timestamp: ["2025-04-04T11:30Z", "2025-04-04T13:38Z"]},
		{approx:'within under 1 minute', timestamp: "2025-04-11T17:19Z"},
		{approx:'within seconds', timestamp: "2025-04-12T13:51:27Z"},
		];
		const playersData_timeSincePrevious = [
		{approx:false, seconds: false},
		{approx:'within hours', seconds: 827725},
		{approx:'within hours', seconds: 19200},
		{approx:'within hours', seconds: [546000, 567600]},
		{approx:'within hours', seconds: [286380, 307980]},
		{approx:'within hours', seconds: [314820, 379620]},
		{approx:'within hours', seconds: [397380, 462180]},
		{approx:'within hours', seconds: 495720},
		{approx:'within hours', seconds: 397500},
		{approx:'within hours', seconds: 576639},
		{approx:'within hours', seconds: 483561},
		{approx:'within hours', seconds: 9718},
		{approx:'within hours', seconds: 192842},
		{approx:'within hours', seconds: [261840, 267960]},
		{approx:'within hours', seconds: [121200, 127320]},
		{approx:'within hours', seconds: [103980, 120180]},
		{approx:'within hours', seconds: [563520, 583380]},
		{approx:'within hours', seconds: [196680, 205800]},
		{approx:'within hours', seconds: [175740, 200700]},
		{approx:'within hours', seconds: [56944, 81904]},
		{approx:'within hours', seconds: 563756},
		{approx:'within hours', seconds: 2100},
		{approx:'within hours', seconds: [436440, 438420]},
		{approx:'within hours', seconds: [374940, 431280]},
		{approx:'within hours', seconds: [244920, 257040]},
		{approx:'within hours', seconds: [273300, 280980]},
		{approx:'within hours', seconds: [618060, 625740]},
		{approx:'within seconds', seconds: 73947},
		];
		const playersData_positions = [
		1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28
		];
		const playersData_notes = [
		// 1 - 10
		"Achieved CCL in 2024 in IDLW (UTC-12:00) (Anywhere on Earth), less than 14 days after starting the rerelease 43 hours late, after grinding on average 15+ hours a day, grinding almost exclusively Authority and Shadow Raid, encountering many delays. CCL #1 is also the creator of this tool!<p/><b>User-written description:</b><br>I've been playing Notoriety since what I call the 'Golden Era', being before the 22 December 2017 revamp, more specifically since early September 2015, or possibly in August 2015 as I bought my first gamepass early next month. I achieved only a few infamy ranks at most, but I also completed feats like the badges Overdrill, Flawless and Big Bank - Stealth Master and 101 bags (vials) in Blood Money Death Wish solo using the Minigun and RPG. Most of my playtime of this era was in 2016. I always get nostalgic of this era of Notoriety, aka Heist, aka Payday 2. I have some old videos and screenshots of this era collecting dust on a hard drive somewhere.<p/>I almost entirely stopped playing after the Revamp Update, as it removed a lot of my favourite heists like World Bank, Blood Money, Fave Breakout and Shadow Raid (eventually rereleased). This is also why I didn't want to play the new Authority heist, out of protest against the revamp and due to the global data wipe. However, I played until I reached the maximum infamy rank of XXV (25) and obtained the True Criminal badge (which also required the Very Hard and Anarchy difficulties). Then I stopped playing for a while. In 2019, during the Live Ops event, I revisited the game, but didn't play any heists.<p/>Around the late 2020 era was when I was extremely active. I was first to complete Star Criminal and Baneful Criminal (the latter was done in solo in 89m54s). I was first to complete Resourceful Criminal in solo, without using glitches. I was one of the first to solo the Soul Collector badge on Nightmare using the Suit, and as the 420th or 421st player to obtain the badge. I was very likely the first player to full sweep Shadow Raid Nightmare 1,000 times. Around this era up until the very end of 2020, I was a dedicated contributor to the official Notoriety Wikia on Fandom, serving the community as an administrator and being the top contributor based on largest contributions (including info, page structure & site design), most edits and most badges & badge points (I no longer believe in badges, since it encourages badge farming).<p/>One of the game's sub-communities was Notorious Professionals, a community collecting the best of Notoriety's players with its goal to be to help people hunt badges, achieve unofficial challenges and maintain the official Notoriety Wikia on Fandom. At the time this community had its own Roblox group and Discord server. Such unofficial challenges range from easy ones like doing a heist with a certain themed loadout (like the TF2 Engineer, using Sentry Guns), to extremely challenging ones like completing Shadow Raid Nightmare solo stealth with 75 detection risk and a full sweep, or Blood Money Nightmare solo with the most awfully designed build at the time (challenge Bad Mofo using the Bad Build). In this community I achieved the rank of True Professional, an achievement which at the time only two others (Chair and StormDestroyer) had achieved. The rate I had completed all the challenges (except True Gambler: Golden Mask Casino 75 detection risk solo stealth) impressed the server owner, sirowesome, as apparently they weren't supposed to be done in such a short timeframe (a couple of weeks at most?). I was also the first ever Notoriety player to reach 10 billion money (achieved 2020-11-08T04:00:~45Z) by grinding Shadow Raid Nightmare ECM rushing with a squad over and over) and Four Stores Nightmare solo stealth 75 detection risk pacifist with no equipment, pagers, hostages or kills. (However, I unfortunately messed up the run at the very end, partially out of excitement at being close to the end. I did, however, show off many tricks that were used by other players to do the same but with a full stealth run and in far less time.) These two achievements resulted in the creation of two bonus challenges.<p/>At the end of December 2020, in the Notoriety Wikia's Discord server, I unfairly muted, if I recall correctly, Berse. The wiki's bureaucrat (essentially Head Admin), Goder5555, privately asked me what was going on, and being a little intimidated by the bureaucrat I wasn't very clear in responding. The bureaucrat's perception was that I was being malicious and uncommunicative. I was warned that 'there would be consequences' if I did not undo the punishment, and then shortly later I was demoted from wiki administrator, blocked (banned) indefinitely (later reduced to 1 year) and stripped of my True Professional rank in Notorious Professionals' group and server (a little too far, in my opinion). Many users began leaving the wiki's server, including Goder. He posted a wiki announcement about what had happened and why I had been demoted and blocked. Apparently I 'refused to hand over ownership of the server' (paraphrasing), however I received no such requests; it was likely that this was only an assumption by Goder. A new wiki server was created, and the old one was eventually deleted months or years later after it had become extremely inactive. I admit now that it was definitely a massive mistake on my part to unfairly mute someone. This incident caused me to quit the entire game and its community for four years.<p/>In December 2024 I found out about the game's rerelease after being shut down for more than a year due to a DMCA strike by the same company which brought it back. I noticed the infamy cap had been raised from 25 (XXV) to 250 (CCL), and wanted to be the first CCL. I contemplated pressing that large, green play button for 43 hours, knowing that if I did I would get right back on the long grind train as I did back in 2018 and 2020. Eventually I gave in and started playing the rerelease as an XXV-100 with $10.5 billion money and more than 1,200 masks (well over the now-existent limit of 100). (I haven't opened a safe since around the 2019/2020 era.) I began the grind rather modestly, only doing a few infamies a day at most, eventually becoming around 8 to 10 hours a day on average. I reached infamy 100 (C) before the cap to infamy money requirement was added, knowing it would be added eventually. (The next infamy would've cost $390mil with the cheaper pass). Around this time or just before was when I realised I could reach CCL by the end of the year.<p/>Up until now I had been very quiet about my grind as I knew others had already made a lot more progress; I didn't want to alert the competition. They were trying to find out who was the new infamy 50 who appeared out of nowhere. It was around this time I made my explosive return to the game's Discord server, Moonstone Games, by posting my infamy 100 screenshot, ahead of the next highest player (Ali) by about 30 or 40 infamy ranks. It was around this time I joined a sub-community server called 'super cool elite grinding buddy ccl250 team cool', or the 'elite grinding server' for short, a server comprised of the most dedicated infamy grinders and the founding purpose was for a member to reach CCL. I grinded money in preparation of the introduction of the infamy money requirement cap (which made it $125mil without cheaper pass, $62.5mil with), ending up with around $3 or $4bil. Ali also reached infamy 100 by this time, and he went to 101 supposedly just to be the highest infamy in the game. He had around $10 or $15bil money at this point. I even adjusted my sleep pattern to make sure I would be wide wake when updates are typically released.<p/>During the money grind (Shadow Raid ECM rush as usual; specifically around the vault area) one of my teammates pointed out the infamy money requirement had just been added. Within 15 minutes of the update I immediately switched to exp farming (Authority) and started grinding HARD, frequently doing 16+ hours a day, occasionally 24 hours and I even once stayed awake for 48 hours (about 95% of this time spent grinding the game). I contributed to two Authority Nightmare co-op (both 4 players) world records before the introduction of the milliseconds timer, being 1m8s while half asleep and 1m7s unintentionally (not submitted). In a single day I completed Authority 500 times in a row, and I completed it 700 times in a row before switching to a different heist due to having to grind money. I grinded money for a bit more during the exp grind, and knew how much money I would need when factoring in passive gains from exp farming. However, what I didn't factor in was the extreme costs of hosting a contract (and consequent restarts after a win) (about $96mil loss per infamy when hosting or $28mil when not). I eventually realised, so I had to grind about another $1bil.<p/>At infamy 182 (CLXXXIII), level 86, being about 80 infamy ranks ahead of #2 (Ali hardly grinded at all), I was grinding exp on Authority and posted the message " + '"' + "the elite grinding server has too many femboys and more are being infected every day "  + '"' + "(skull emoji) in a private match where no one would be offended by the word 'femboy'. 53 seconds later, having just bagged Gold Bars, I received my first-ever moderation on the platform in nearly 11 years, despite everything I have been able to get away with in the past. A 1-day account suspension, of which my two appeals were auto-denied. I even tried to manipulate the AI, but failed. I got up early with minimal rest hoping that I would receive a response to my email appeal, but did not receive a response until the ban had expired, on the weekend in Roblox HQ's time no less. I was very pissed off at this unfair punishment and Roblox's lack of care for appeals. I still really wanted to reach CCL before 2025, so I made a deal with someone called Ashlyn to have exp and cash boosters bought and paid for. Specifically, the deal was a one-time payment of 2,200 Robux (I actually received extra, in a total of two digital gift cards), in exchange for my time and energy grinding with her until she reached CCL, something she really wanted. I did not specify any specific amount of grinding. This deal was made public (my idea) for trust purposes, being posted in #general of Moonstone Games and publicly agreed by both parties. Due to this ban I ended up not being able to reach CCL in 2024 in all time zones, so I aimed for the European and American time zones instead.<p/>At infamy 240 (CCXL), being probably 100+ infamy ranks ahead of everyone else, around 2024-12-31T20:19:35Z (CCXL obtainment time), I was grinding money (Shadow Raid ECM rush, unsurprisingly) with Derp and withwillin (who became CCLs #2 and #3, respectively). While running to the van my head began spinning. We finished that run and I told my teammates I would take a break and lie down for 5 minutes, only to pass out for 10 hours. I didn't even notice how long it had been until I saw the 'You have been disconnected for being idle 20 minutes' notice on my screen and checked the time. I wasn't too happy to find out how long it's been. I realised I could still reach CCL in 2024 in the last time zone on the planet, International Date Line West (UTC-12:00), or Anywhere on Earth. I started the grind again and grinded Authority until 2025-01-01T10:04:35Z when I had officially become the first ever CCL and the first owner of the Rank 250 badge, with just under two hours remaining in 2024 in IDLW, 13 days, 22 hours, 45 minutes and 22 seconds since I started the rerelease (based on 'Jade's Finest' badge obtainment timestamp). Until CCL I had made about ~$20bil in total in my Notoriety career. I posted the screenshot in multiple servers (some of which I eventually left), including Moonstone Games and the elite grinding server, which received many reactions and congratulations, including by my former competitor Ali. I was the only CCL for more than 9.5 days until Derp became #2, followed closely by his duo withwillin. Aurora was significantly later, and just hours before the suit revamp. We became known as The Crimson Four (actually, this is a term I coined), as in the only four owners of the rarest non-developer item in the game, the Crimson suit. We eventually managed to coordinate a get-together where we all joined the same lobby and took screenshots of us wearing the Crimson suit and playing one heist: Jewelry Shop Normal, full sweep with loose loot and safes, everything destroyed, everyone murdered with their bodies in the van.",
		"Achieved a great many infamy ranks with his duo, withwillin101, then reached CCL only hours before his duo. Would've achieved CCL much sooner if not for school and mucking about for about the first week of the rerelease.",
		"Achieved a great many infamy ranks with his duo, Derpifi3d, then reached CCL only hours after his duo.",
		"Achieved CCL mere hours before the suit revamp, becoming the fourth and final owner of the now-unobtainable Crimson (now Classic Crimson) suit pattern.",
		"Highest infamy classic suit: Rojo (200)",
		"Highest infamy classic suit: Royalty (150)",
		"Highest infamy classic suit: Royalty (150)",
		"Highest infamy classic suit: Royalty (150)",
		"Highest infamy classic suit: Blue Navy (100)",
		"<b>User-written description:</b><br>i knew about notoriety for a very long time, and i did try it out for a bit, but ended up stopping (couldn't tell you why, i have basically no memory of it other than when i started playing again, i was level 8 and had like 50k in cash)<p/>i played payday 2 on and off for years (on console, wasn't much of a pc gamer at the time). eventually moved onto other games. never played payday: the heist or anything, but i did enjoy payday 2<p/>i picked up notoriety again at the 31st of december 2024, since i heard about it being reopened. started off just playing casually for a bit, then i wanted to complete every heist on every difficulty and every tactic (to fill out the heist tracker)<p/>i then moved onto badges, which i got those pretty quickly (pied piper sucks lmao)<p/>somewhere around early january this year, i decided to go for CCL, but i didn't really want to grind it by doing the same heists over and over for max efficiency<p/>so i got to CCL by mostly playing public lobbies, helping others with badges and nightmare. mixed in some solo stealth too (mostly ozela)<p/>i hit CCL at the 16th of february 2025 just after 2:40 a.m",
		// 11 - 20
		undefined,
		"This user grinded 200 infamy ranks with random players in public matches.",
		"Highest infamy classic suit: Blue Navy (100)",
		undefined,
		undefined,
		undefined,
		"Possibly the first post-rerelease player to reach CCL, based on their badges.",
		undefined,
		"Possibly the first alternate account to reach CCL, being possibly an alt of CCL #17; this is based on having a very empty profile and the default avatar, in addition to only being friends with CCL #17 (at the time of addition to the CCLs list, friends with another player) and their badges being almost exclusively Notoriety ones since joining the game until Rank 250.",
		"Possibly the first solo grinder to reach CCL.",
		// 21 - 28
		undefined,
		undefined,
		undefined,
		undefined,
		"This user primarily solo grinded to CCL. May also be the first CCL to reach it without owning the 'True Criminal' badge (1873037302).",
		undefined,
		"This user was at infamy 235 for multiple months before finally going past the finish line and reaching CCL. Without this stoppage, it was likely the user could've made the first 15 or so CCLs. Highest infamy classic suit: Royalty (150)<p/><b>User-written description:</b><br>I first played Notoriety in the year 2020. In late July of 2022, I discovered the game again because my sister and a friend of mine had asked me to play. I quickly got the hang of it, and in 30 days I had gotten both XXV-100 and True Criminal.<p/>During that time I also joined Moonstone Games, where I am still active. The fall of that year, I became interested in endurance challenges for Notoriety. To my knowledge, we were the first to ever get 200 bags on Trick or Treat (Red, Toxic, Myself and Jon) , and the first to get 200 vials on Blood Money (Myself and LuboMontana). We also attempted 1.000 bags on ToT multiple times, but we were not able to do it at that time. After the DMCA takedown, I remained active in the community until the re-release.<p/>After that, I got invested into getting more infamies and playing more, and I was the second ever member of Pho's ECM Rushing server, where I am also active to this day and rank relatively highly in, being an active ECM Rusher and having gotten most of my infamies in. By 31/12/2024 I was infamy 100, then by 16/01/2025 150, and then infamy 200 on the 07/02/2025.<p/>Two days later, myself and the same people that attempted 1.000 bags in ToT before the DMCA takedown, smashed that limit and managed to get 3.000 bags, being the first and only to do thus far. It took us almost 16 hours. After I got to Infamy 225, I took a nearly 2 month long hiatus. I got to CCL on 11/04/2025, having gotten my last 100 levels in an infamy rotation.",
		"This user was most likely the first CCL to achieve it without progression gamepasses or Robux-bought boosters.",
		];
		
		for (var x = 0; x < countCCLs; x++) {
			players.push(new Player());
			if (playersData_usernames[x] == undefined) {
				players[x].username = undefined;
			} else {
				players[x].username = playersData_usernames[x];
			}
			console.log(playersData_usernames[x]);
			
			if (playersData_displayNames[x] == undefined) {
				players[x].displayName = undefined;
			} else {
				players[x].displayName = playersData_displayNames[x];
			}
			
			if (playersData_robloxAvatars[x] == undefined) {
				players[x].robloxAvatar = undefined;
			} else {
				players[x].robloxAvatar = playersData_robloxAvatars[x];
			}
			
			if (playersData_whenCCL[x] == undefined) {
				players[x].whenCCL = undefined;
			} else {
				players[x].whenCCL = playersData_whenCCL[x];
			}
			
			if (playersData_timeSincePrevious[x] == undefined) {
				players[x].timeSincePrevious = undefined;
			} else {
				players[x].timeSincePrevious = playersData_timeSincePrevious[x];
			}
			
			if (playersData_positions[x] == undefined) {
				players[x].position = undefined;
			} else {
				players[x].position = playersData_positions[x];
			}
			
			if (playersData_notes[x] == undefined) {
				players[x].notes = undefined;
			} else {
				players[x].notes = playersData_notes[x];
			}
		}
		
		// Crimson: 128,0,0
		// Rojo: 220,20,60
		// Royalty: 106,50,159
		// Blue Navy: 7,55,99
		
		function playerHTML(input, backgroundRGB) {
			var output = "";
			if (backgroundRGB == undefined) {
				output += "<td class='NotorietyEXPCalculator_HallofInfamyCCLsPlayer'>";
			} else {
				output += "<td class='NotorietyEXPCalculator_HallofInfamyCCLsPlayer' style='background:rgba(" + backgroundRGB + ",var(--bg-alpha))'>";
			}
			
			output += "<div class='ImageTextContainer'>";
			
			if (input.robloxAvatar != undefined) {
				output += "<img src='./Notoriety EXP Calculator/Assets/CCL Roblox avatars/" + input.robloxAvatar + "' style='width:10em;float:left'/>";
			}
			
			output += "<div class='CellText'>";
			
			if (input.position != undefined) {
				output += '[#' + input.position.toLocaleString() + '] ';
			}
			
			output += "<b>";
			if (input.username == undefined /*"T4x_Ev4der"*/) {
				output += '<i>--(This display name cannot be placed here)--</i>';
			} else {
				output += input.displayName;
			}
			output += " (<a href='https://www.roblox.com/users/profile?username=" + input.username + "'>@" + input.username + "</a></b>)";
			
			output += "<p style='font-size:80%'>";
			if (input.whenCCL != undefined) {
				const orig = input.whenCCL;
				output += "Badge obtained: ";
				if (typeof orig.timestamp == 'object') {
					output += 'between ';
					output += formatDate(new Date(orig.timestamp[0]), "yyyy-MM-dd HH:mm:ss", false);
					output += ' to ';
					output += formatDate(new Date(orig.timestamp[1]), "yyyy-MM-dd HH:mm:ss", false);
				} else {
					output += formatDate(new Date(orig.timestamp), "yyyy-MM-dd HH:mm:ss", false);
				}
				if (orig.approx != false) {
					if (orig.approx == true) {
						output += " <small>(approximately)</small>";
					} else {
						output += " <small>(approximately: " + orig.approx + ")</small>";
					}
				}
			}
			
			const timeOutput = new Timer();
			if (data.toggleTimeOutputFormat_Global == undefined) {
				data.toggleTimeOutputFormat_Global = 1;
			}
			timeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][Number(data.toggleTimeOutputFormat_Global)];
			
			if (input.timeSincePrevious != undefined) {
				const orig = input.timeSincePrevious;
				if (input.timeSincePrevious.seconds !=  false) {
					output += "<br>Time since previous: ";
					if (typeof orig.seconds == 'object') {
						output += 'between ';
						timeOutput.amount = orig.seconds[0] * 1e3;
						output += timeOutput.formatAmount();
						output += ' to ';
						timeOutput.amount = orig.seconds[1] * 1e3;
						output += timeOutput.formatAmount();
					} else {
						timeOutput.amount = orig.seconds * 1e3;
						output += timeOutput.formatAmount();
					}
					if (orig.approx != false) {
						if (orig.approx == true) {
							output += " <small>(approximately)</small>";
						} else {
							output += " <small>(approximately: " + orig.approx + ")</small>";
						}
					}
					
					if (input.position != undefined) {
						output += "<br>Average time apart: "
						if (typeof input.whenCCL.timestamp == 'object') {
							output += 'between ';
							timeOutput.amount = (new Date(input.whenCCL.timestamp[0]).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount();
							console.log(timeOutput.formatAmount());
							output += ' to ';
							timeOutput.amount = (new Date(input.whenCCL.timestamp[1]).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount();
							console.log(timeOutput.formatAmount());
						} else {
							timeOutput.amount = (new Date(input.whenCCL.timestamp).getTime() - new Date(playersData_whenCCL[0].timestamp).getTime()) / input.position;
							output += timeOutput.formatAmount();
						}
					}
				}
			}
			
			output += '</p>';
			
			if (input.notes != undefined) {
				output += "<p>" + input.notes + "</p>";
			}
			
			output += "";
			output += "";
			output += "</div></div></td><tr/>";
			
			return output;
		}
		string += "<p><table style='margin:auto;width:100%'>";
		string += "<hr/><h3 style='text-align:center'>The Crimson Four</h3>";
		for (var x = 0; x < 4; x++) {
			string += playerHTML(players[x], '128,0,0');
		}
		string += "</table></p>";
		
		string += "<p><table style='margin:auto;width:100%'>";
		string += "<h3 style='text-align:center'>Post-suits revamp (" + formatDate(new Date("2025-01-17T20:00Z"), "yyyy-MM-dd HH:mm:ss", false) + ") CCLs</h3>";
		for (var x = 0; x < (countCCLs - 4); x++) {
			if (["seroly2345"].indexOf(players[x + 4].username) != -1) {
				string += playerHTML(players[x + 4], '220,20,60');
			} else if (["theREALdynamic", "bigfootbb045", "LuvlyGirlMaisy", "Aimilized"].indexOf(players[x + 4].username) != -1) {
				string += playerHTML(players[x + 4], '106,50,159');
			} else if (["ARandomNoobGamer", "cl3rical"].indexOf(players[x + 4].username) != -1) {
				string += playerHTML(players[x + 4], '7,55,99');
			} else {
				string += playerHTML(players[x + 4]);
			}
		}
		string += "</table></p>";
		elem.SectionContainer_HallofInfamyCCLs.innerHTML = string;
	}
	addHallofInfamyCCLs();
	
	function addUpdateLogs() {
	    function updateLogEntry(type, string, isVersion) {
	        if (isVersion === undefined) {
	            isVersion = false;
	        }
	        var output = '';
	        if (isVersion === false) {
	            output += '<li>';
	            switch (type) {
	                case 'add':
	                    output += "<span class='ULAdd'>+</span> ";
	                    break;
	                case 'edit':
	                    output += "<span class='ULChange'>*</span> ";
	                    break;
	                case 'remove':
	                    output += "<span class='ULRemove'>-</span> ";
	                    break;
	                case 'fix':
	                    output += "<span class='ULFix'>^</span> ";
	                    break;
	                case 'other':
	                    output += "<span class='ULOther'>?</span> ";
	            }
	            output += string + '</li>';
	        }
	        if (string === undefined) {
	            output = '';
	        }
	        return output;
	    }
	    var theLogs = `<b>Legend:</b><p>
		<ul>
			${updateLogEntry('add', 'Addition of something')}
			${updateLogEntry('edit', 'Edit of a feature')}
			${updateLogEntry('remove', 'Removal of something')}
			${updateLogEntry('fix', 'Patch of a problem')}
			${updateLogEntry('other', 'Other')}
		Major tool versions are <u>underlined</u>.
		<p/>
		Estimated total active development time across all versions: ~44 hours.
		<p/>
		Some features of this tool are copied from my other tools, including an extremely developed tool that has seen hundreds of hours of active development time yet hasn't seen the light of day with a release.
		</ul>
		</p>
		<hr/>
		<p>
		<b>[Testing] <u>Version 0.0.1 - The Beginning</u></b>
		<ul>
			${updateLogEntry('other', "Testers: ashvul (did not test), nate247, player6978.")}
			${updateLogEntry('other', "Estimated active development time: ~4 hours.")}
		</ul></p>
		<b>[Testing] <u>Version Indev</u></b>
		<ul>
			${updateLogEntry('add', "Added everything else. (A lot!)")}
			${updateLogEntry('other', "Estimated active development time: ~40 hours over about 10 weeks.")}
		</ul></p>
		<hr/>
		</ul>`
		
		elem.SectionContainer_UpdateLogs.innerHTML = theLogs;
	}
	addUpdateLogs();

	function getRotationInput(input) {
		const runLog = [];
		var test_a = input;
	    var extraTime = new Decimal(0), returnsToMenu = new Decimal(0), includedRuns = new Decimal(0), excludedRuns = new Decimal(0);

	    function getNextLine(index) {
	        function Run(money, exp, mxp, time) {
	            this.money = money;
	            this.exp = exp;
				this.mxp = mxp;
	            this.time = time;
	        }
	        if (test_a.match(/EXCL?(?=[=])/) != null || test_a.match(/MENU?(?=[(])/) != null) {
	            if (test_a.match(/EXCL?(?=[=])/) != null) {
	                test_a = test_a.replace(/EXCL[=]/, '');
					excludedRuns = excludedRuns.add(1);
	            } else if (test_a.match(/MENU?(?=[(])/) != null) {
	                test_a = test_a.replace(/MENU[(]/, '');
	                extraTime = extraTime.add(Number(test_a.match(/.+?(?=[)])/)[0].replace(/[)]/, '')));
	                test_a = test_a.replace(/.+?(?=[)])[)]/, '');
					returnsToMenu = returnsToMenu.add(1);
	            }
	        } else {
	            const x = new Run();
				switch (data.toggleComputationType_Global) {
					case 0:
						x.money = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.exp = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.time = new Decimal(Number(test_a.match(/.*$/m)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.*$\n/m, '');
						break;
					case 1:
						x.mxp = new Decimal(Number(test_a.match(/.+?(?=[|])/)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.+?(?=[|])[|]/, '');
						x.time = new Decimal(Number(test_a.match(/.*$/m)[0].replace(/,/g, '')));
						test_a = test_a.replace(/.*$\n/m, '');
				}
	            runLog.push(x);
				includedRuns = includedRuns.add(1);
	        }

	    }
	    var i = 0;
	    while (test_a != '') {
			if (test_a.match(/[|]/) != null) {
				getNextLine(i);
				i++;
			} else {
				test_a = '';
			}
	    }
		return {runLog:runLog, extraTime:extraTime, returnsToMenu:returnsToMenu, includedRuns:includedRuns, excludedRuns:excludedRuns};
	}
	function interpretRotationInput(input) {
		function Totals(money, exp, mxp, time, extraTime) {
			this.money = new Decimal(0);
			this.exp = new Decimal(0);
			this.mxp = new Decimal(0);
			this.time = new Decimal(0);
			this.extraTime = new Decimal(0);
			this.returnsToMenu = new Decimal(0);
			this.includedRuns = new Decimal(0);
			this.excludedRuns = new Decimal(0);
		}
		const result = new Totals();
		for (var x = 0; x < input.runLog.length; x++) {
			result.money = result.money.add(input.runLog[x].money);
			result.exp = result.exp.add(input.runLog[x].exp);
			result.mxp = result.mxp.add(input.runLog[x].mxp);
			result.time = result.time.add(input.runLog[x].time);
		}
		result.extraTime = result.extraTime.add(input.extraTime);
		result.returnsToMenu = result.returnsToMenu.add(input.returnsToMenu);
		result.includedRuns = result.includedRuns.add(input.includedRuns);
		result.excludedRuns = result.excludedRuns.add(input.excludedRuns);
		return result;
	}
	var rotationInputTesting = "3,250,700|842,500|170\n2580715|948048|155";
	
	data = {
		currentLevel: new Decimal(1),
		remainingEXP: new Decimal(0),
		goalLevel: new Decimal(100),
		currentInfamyLevel: new Decimal(0),
		goalInfamyLevel: new Decimal(1),
		moneyLoss: new Decimal(0),
		currentMoney: new Decimal(0),
		currentMutatorRank: new Decimal(0),
		remainingMXP: new Decimal(0),
		goalMutatorRank: new Decimal(1),
		untilMXPUsage: new Decimal(0),
		
		toggleInputSliders_Global: 1,
		toggleRomanNumerals_Global: 1,
		toggleInputExplanations_Global: 1,
		toggleComputationType_Global: 0,
		toggleInfiniteInfamies_Global: 0,
		toggleAutoCalculate_Global: 0,
		toggleTimeOutputFormat_Global: 1,
		
		untilOutOfMoneyCheck: 0,
		cheaperPassCheck: 0,
		preMoneyCapCheck: 0,
		rotationInputTotals: function(a) {return interpretRotationInput(getRotationInput(a))},
	};

	const styleSheet_Global = document.createElement('style');
	document.head.appendChild(styleSheet_Global);

	function addGlobalStyling(input, deleteExisting) {
		if (deleteExisting != false) {
			while (styleSheet_Global.sheet.rules.length > 0) {
				styleSheet_Global.sheet.deleteRule(0);
			}
		}
		styleSheet_Global.sheet.insertRule(input)
	}
	
	const menuIDs = ['NotorietyEXPandInfamyCalculator_MenuContainer_Calculator', 'NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous'];
	const menuButtonIDs = ['NotorietyEXPCalculatorMenuButton_Calculator', 'NotorietyEXPCalculatorMenuButton_Miscellaneous'];
	
	// make menu buttons work
	function hideAllMenus() {
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Calculator').style.display = 'none';
		document.getElementById('NotorietyEXPandInfamyCalculator_MenuContainer_Miscellaneous').style.display = 'none';
	}
	
	function switchMenuToThis(input) {
		hideAllMenus();
		document.getElementById(menuIDs[menuButtonIDs.indexOf(input)]).style.display = '';
	}
	switchMenuToThis(menuButtonIDs[0]);
	
	(function() {
		const orig = document.getElementById('NotorietyEXPandInfamyCalculator_MenuButtons');
		
		const menuButton_Calculator = document.createElement('button');
		const menuButton_Miscellaneous = document.createElement('button');
		const buttons = [menuButton_Calculator, menuButton_Miscellaneous];
		buttons[0].innerHTML = "<span style='color:rgba(255,255,255,var(--bg-alpha));font-weight:bold'>Calculator</span>";
		buttons[1].innerHTML = "<span style='color:rgba(255,255,255,var(--bg-alpha));font-weight:bold'>Miscellaneous</span>";
		for (var x = 0; x < buttons.length; x++) {
			buttons[x].setAttribute('class', 'NotorietyEXPCalculatorButton NotorietyEXPCalculatorMenuButton');
			buttons[x].setAttribute('id', menuButtonIDs[x]);
			orig.appendChild(buttons[x]);
			buttons[x].addEventListener('click', function() {
				switchMenuToThis(this.id);
			});
		}
	}());

	function updateSettingsDisplayedValues() {
		data.currentLevel = new Decimal(elem.currentLevelInput.value).floor().max(new Decimal(1).min(100));
		data.remainingEXP = new Decimal(elem.remainingEXPInput.value).floor().max(new Decimal(0).min(999999));
		data.goalLevel = new Decimal(elem.goalLevelInput.value).floor().max(new Decimal(0).min(100));
		data.currentInfamyLevel = new Decimal(elem.currentInfamyLevelInput.value).floor().max(new Decimal(0).min(elem.currentInfamyLevelInput.value));
		data.goalInfamyLevel = new Decimal(elem.goalInfamyLevelInput.value).floor().max(new Decimal(0).min(elem.goalInfamyLevelInput.value));
		data.currentMoney = new Decimal(elem.currentMoneyInput.value).floor().max(0);
		
		data.currentMutatorRank = new Decimal(elem.currentMutatorRankInput.value);
		data.goalMutatorRank = new Decimal(elem.goalMutatorRankInput.value);
		data.remainingMXP = new Decimal(elem.remainingMXPInput.value);
		data.untilMXPUsage = new Decimal(elem.untilMXPUsageInput.value);
		
		elem.currentLevelInputResult.innerHTML = data.currentLevel;
		elem.remainingEXPInputResult.innerHTML = data.remainingEXP;
		elem.goalLevelInputResult.innerHTML = data.goalLevel;
		elem.currentInfamyLevelInputResult.innerHTML = toRomanWithSeparator(data.currentInfamyLevel, data.currentInfamyLevel, data.toggleRomanNumerals_Global, false);
		elem.goalInfamyLevelInputResult.innerHTML = toRomanWithSeparator(data.goalInfamyLevel, data.goalInfamyLevel, data.toggleRomanNumerals_Global, false);
		
		(function() {
			
			const elems = [elem.untilOutOfMoneyCheck, elem.cheaperPassCheck, elem.preMoneyCapCheck];
			const elems_DataRefs = ['untilOutOfMoneyCheck', 'cheaperPassCheck', 'preMoneyCapCheck'];
			for (var x = 0; x < elems.length; x++) {
				if (data[elems_DataRefs[x]] == 1) {
					elems[x].classList.remove('SwitchButtonDisabled');
					elems[x].classList.add('SwitchButtonEnabled');
				} else {
					elems[x].classList.remove('SwitchButtonEnabled');
					elems[x].classList.add('SwitchButtonDisabled');
				}
			}
		}());
		
		if (data.toggleInputExplanations_Global == 1) {
			addGlobalStyling(".NotorietyEXPandInfamyCalculator_InputExplanation { }", true);
		} else {
			addGlobalStyling(".NotorietyEXPandInfamyCalculator_InputExplanation { display:none }", true);
		}
		
		function hideAllSections() {
			elem.toggleInfiniteInfamies_Global_Container.style.display = 'none';
			
			elem.Section_LevelSettings.style.display = 'none';
			elem.Section_MutatorRankSettings.style.display = 'none';
			elem.Section_InfamySettings.style.display = 'none';
		}
		hideAllSections();
		
		var runGainsInput_InputExplanation_Text = '<br>';
		runGainsInput_InputExplanation_Text += '(One run per line. One rotation for the entire input. Begin a line with <code>EXCL=</code> to exclude it from the calculations entirely. Time can be added to the calculations by using <code>MENU</code>. For instance, a line containing only the text <code>MENU(85)</code> means 85 seconds spent in menu, loading or otherwise not in a run. While it is possible to use this line after each run, it is instead recommended to already factor in loading times in the times of each run, as doing so will reduce the amount of computations the tool needs to perform. <b>Factor in repeat bonus</b>, as each line is equal to one run.';
		switch (data.toggleComputationType_Global) {
			case 0:
				elem.toggleInfiniteInfamies_Global_Container.style.display = '';
				elem.Section_LevelSettings.style.display = '';
				elem.Section_InfamySettings.style.display = '';
				
				elem.runGainsInput.placeholder = 'Money|EXP|Time (seconds). Example of a rotation involving 3 runs (heists):\n\n3,250,700|842,500|170\n2580715|948048|155\n2600750|405725|162';
				runGainsInput_InputExplanation_Text += ' Money, EXP and Time values will be averaged based on all included runs, and then these averages will be used for computations. If you know exactly which particular runs are needed for each infamy, it is heavily recommended to input them.';
				break;
			case 1:
				elem.Section_MutatorRankSettings.style.display = '';
				if (data.toggleInfiniteInfamies_Global == 1) {
					elem.toggleInfiniteInfamies_Global.click();
				}
				
				elem.runGainsInput.placeholder = 'MXP|Time (seconds). Example of a rotation involving 3 runs (heists):\n\n8,500|170\n4048|155\n5725|162';
				runGainsInput_InputExplanation_Text += ' MXP and Time values will be averaged based on all included runs, and then these averages will be used for computations.';
		}
		
		runGainsInput_InputExplanation_Text += ' While commas can be included in numbers, <b>do not include suffixed numbers</b> such as 1M.';
		
		elem.runGainsInput_InputExplanation.innerHTML = runGainsInput_InputExplanation_Text;
		
		if (data.toggleInfiniteInfamies_Global == 1) {
			elem.currentInfamyLevelInput.max = 'Infinity';
			elem.goalInfamyLevelInput.max = 'Infinity';
		} else {
			elem.currentInfamyLevelInput.max = '250';
			elem.goalInfamyLevelInput.max = '250';
		}
	}
	updateSettingsDisplayedValues();
	
	elem.SectionContainerToggle_InfamySettings.addEventListener('click', function() {
		elem.SectionContainer_InfamySettings.style.display = elem.SectionContainer_InfamySettings.style.display == 'block' ? 'none' : 'block'
		if (elem.SectionContainer_InfamySettings.style.display == 'none') {
			elem.currentInfamyLevelInput.value = 0;
			elem.goalInfamyLevelInput.value = 0;
			elem.currentMoneyInput.value = 0;
		}
		computeBeepBoop();
	});
	
	elem.SectionContainerToggle_UpdateLogs.addEventListener('click', function() {
		elem.SectionContainer_UpdateLogs.style.display = elem.SectionContainer_UpdateLogs.style.display == 'block' ? 'none' : 'block'
	});
	
	elem.SectionContainerToggle_HallofInfamyCCLs.addEventListener('click', function() {
		elem.SectionContainer_HallofInfamyCCLs.style.display = elem.SectionContainer_HallofInfamyCCLs.style.display == 'block' ? 'none' : 'block'
	});
	
	// --------------------
	// Add listeners to toggles
	(function() {
		elem.toggleInputSliders_Global.addEventListener('click', function() {
			data.toggleInputSliders_Global = data.toggleInputSliders_Global == 0 ? 1 : 0
			this.innerHTML = ['Input method: Manual inputs', 'Input method: Sliders'][Number(data.toggleInputSliders_Global)];
			const sliderElems = [elem.currentLevelInput, elem.remainingEXPInput, elem.goalLevelInput, elem.currentInfamyLevelInput, elem.goalInfamyLevelInput];
			for (var x = 0; x < sliderElems.length; x++) {
				sliderElems[x].type = data.toggleInputSliders_Global == 1 ? 'range' : '';
			}
		});
		
		elem.toggleRomanNumerals_Global.addEventListener('click', function() {
			data.toggleRomanNumerals_Global = data.toggleRomanNumerals_Global == 0 ? 1 : 0
			this.innerHTML = ['Roman numerals: OFF', 'Roman numerals: ON'][Number(data.toggleRomanNumerals_Global)];
			updateSettingsDisplayedValues()
			if (data.toggleAutoCalculate_Global == 1) {
				computeBeepBoop();
			}
		});
		
		elem.toggleAutoCalculate_Global.addEventListener('click', function() {
			data.toggleAutoCalculate_Global = data.toggleAutoCalculate_Global == 0 ? 1 : 0
			this.innerHTML = ['Auto calculate: OFF', 'Auto calculate: ON'][Number(data.toggleAutoCalculate_Global)];
			if (data.toggleAutoCalculate_Global == 1) {
				computeBeepBoop();
			}
		});
		
		elem.toggleInputExplanations_Global.addEventListener('click', function() {
			data.toggleInputExplanations_Global = data.toggleInputExplanations_Global == 0 ? 1 : 0
			this.innerHTML = ['Input explanations: Hidden', 'Input explanations: Visible'][Number(data.toggleInputExplanations_Global)];
			updateSettingsDisplayedValues();
		});
		
		elem.toggleComputationType_Global.addEventListener('click', function() {
			elem.runGainsInput.value = '';
			switch (data.toggleComputationType_Global) {
				case 0:
					data.toggleComputationType_Global = 1;
					break;
				case 1:
					data.toggleComputationType_Global = 0;
			}
			this.innerHTML = 'Computing: ' + ['EXP, Levels & Infamy', 'MXP & Mutator Ranks'][Number(data.toggleComputationType_Global)];
			updateSettingsDisplayedValues();
			computeBeepBoop();
		});
		
		elem.toggleInfiniteInfamies_Global.addEventListener('click', function() {
			data.toggleInfiniteInfamies_Global = data.toggleInfiniteInfamies_Global == 0 ? 1 : 0
			this.innerHTML = ['Maximum infamies: 250', 'Maximum infamies: Unlimited (Disable input sliders)'][Number(data.toggleInfiniteInfamies_Global)];
			updateSettingsDisplayedValues();
		});
		
		elem.toggleTimeOutputFormat_Global.addEventListener('click', function() {
			switch (data.toggleTimeOutputFormat_Global) {
				case 0:
					data.toggleTimeOutputFormat_Global = 1;
					break;
				case 1:
					data.toggleTimeOutputFormat_Global = 2;
					break;
				case 2:
					data.toggleTimeOutputFormat_Global = 3;
					break;
				case 3:
					data.toggleTimeOutputFormat_Global = 0;
			}
			this.innerHTML = 'Time output format: ' + ['digital', 'words', 'wordsShort', 'wordsShorter'][Number(data.toggleTimeOutputFormat_Global)];
			updateSettingsDisplayedValues();
			addHallofInfamyCCLs();
			if (data.toggleAutoCalculate_Global == 1) {
				computeBeepBoop();
			}
		});
	}());
	
	// settings checkboxes event listeners
	(function() {
		const elems = [elem.untilOutOfMoneyCheck, elem.cheaperPassCheck, elem.preMoneyCapCheck];
		const elems_DataRefs = ['untilOutOfMoneyCheck', 'cheaperPassCheck', 'preMoneyCapCheck'];
		for (var x = 0; x < elems.length; x++) {
			const y = elems[x];
			y.value = data[elems_DataRefs[x]];
			y.addEventListener('click', function() {
				data[elems_DataRefs[elems.indexOf(y)]] = data[elems_DataRefs[elems.indexOf(y)]] == 0 ? 1 : 0
				this.innerHTML = ['[N]', '[Y]'][Number(data[elems_DataRefs[elems.indexOf(y)]])];	
				updateSettingsDisplayedValues();
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
				
				if (y.id == elem.untilOutOfMoneyCheck.id) {
					if (data.untilOutOfMoneyCheck == 1) {
						elem.goalInfamyLevelInput.style.display = 'none';
						elem.goalInfamyLevelInputResult.style.display = 'none';
					} else {
						elem.goalInfamyLevelInput.style.display = '';
						elem.goalInfamyLevelInputResult.style.display = '';
					}
				}
			});
		}
	}());
	
	// settings visual display event listeners
	(function() {
		const elems = [elem.currentLevelInput, elem.remainingEXPInput, elem.goalLevelInput, elem.currentInfamyLevelInput, elem.goalInfamyLevelInput];
		for (var x = 0; x < elems.length; x++) {
			elems[x].addEventListener('input', function() {
				updateSettingsDisplayedValues()
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// settings inputs event listeners
	(function() {
		const elems = [elem.currentMoneyInput];
		for (var x = 0; x < elems.length; x++) {
			elems[x].addEventListener('input', function() {
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// settings textarea inputs event listeners
	(function() {
		const elems = [elem.runGainsInput];
		// const elems_DataRefs = ['rotationInputTotals'];
		for (var x = 0; x < elems.length; x++) {
			elems[x].addEventListener('blur', function() {
				if (data.toggleAutoCalculate_Global == 1) {
					computeBeepBoop();
				}
			});
		}
	}());
	
	// This function used to use its own formatting logic, however now it simply invokes notateInt, after ensuring the tool uses the Break Eternity decimal library.
	function formatInt(input) {
		return notateInt(input);
	}
	
	function computeBeepBoop() {
		updateSettingsDisplayedValues();
		
		var disclaimerText = '';
		switch (data.toggleComputationType_Global) {
			case 0:
				disclaimerText += "(Important: While more inputted runs provides greater accuracy, it will also take slightly longer to calculate, depending on available browser resources. Higher infamy ranks contribute significantly more to lag. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with less runs. Additionally, the EXP result may be inaccurate by up to about <code>1</code> per level due to inconsistency regarding how the game rounds numbers. This tool assumes this value: <code>27,181,253</code> (calculated by summing <code>x = 1, floor(x*1018.93+x^2.976664), until x = 100</code>). Also, with 'Until out of money' enabled, the tool does not carry over superfluous EXP after each infamy, so the actual runs/rotations needed may be slightly less. The runs/rotations required result is always rounded up (consequently affecting playtime as well). Lastly, the maximum passive infamies is <code>1,000,000</code> for performance reasons.)";
				break;
			case 1:
				disclaimerText += "(Important: While more inputted runs provides greater accuracy, it will also take slightly longer to calculate, depending on available browser resources. Higher Mutator Ranks and 'Until MXP usage' values contribute significantly more to lag. If it appears the tool has frozen the browser, force refresh it or close the tab and try again with less runs. Also, with 'Until MXP usage' defined, the tool does not carry over superfluous MXP after each rank, so the actual runs/rotations needed may be slightly less. The formula to determine MXP requirement from the current rank (x) for the next rank is <code>5000 + (x ** 1.25)</code>, which is then rounded down for each rank. The runs/rotations required result is always rounded up (consequently affecting playtime as well). Lastly, there is a limit of <code>1,000,000,000,000</code> Mutator Ranks for performance reasons." + ')';
		}
		elem.resultsDisclaimer.innerHTML = disclaimerText;
		var outputString = '';
		var totalExpReq = new Decimal(0);
		var totalMxpReq = new Decimal(0);
		const testingFalsy = false;
		const rotationInputsCalculated = data.rotationInputTotals(elem.runGainsInput.value)
		var forEXPOnlyNote = false;
		
		
		const avgTime = rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime).dividedBy(rotationInputsCalculated.includedRuns);
		const avgTimeOutput = new Timer();
		avgTimeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][data.toggleTimeOutputFormat_Global];
		avgTimeOutput.amount = avgTime.times(1e3);
		switch (data.toggleComputationType_Global) {
			case 0:
				var avgExpGains = rotationInputsCalculated.exp.dividedBy(rotationInputsCalculated.includedRuns);
				var infamyRunsReq = NotoExpReqTotal(1, 100).dividedBy(avgExpGains);
				var avgMoneyGains = (rotationInputsCalculated.money.dividedBy(rotationInputsCalculated.includedRuns)).times(infamyRunsReq);
				if (data.currentInfamyLevel.equals(0) && data.goalInfamyLevel.equals(0)) {
				var levelDiff = data.goalLevel.sub(data.currentLevel).abs();
				totalExpReq = NotoExpReqTotal(data.currentLevel.min(data.goalLevel), data.currentLevel.max(data.goalLevel));
				if (data.remainingEXP.notEquals(0)) {
					var nextLevelReq = NotoExpReqTotal(data.currentLevel.min(data.goalLevel), data.currentLevel.min(data.goalLevel).add(1));
					totalExpReq = totalExpReq.sub(nextLevelReq.min(data.remainingEXP.sub(nextLevelReq).abs()));
				}
				outputString += "To go from Level " + formatInt(data.currentLevel) + " to " + formatInt(data.goalLevel) + ", the following is required:";
				outputString += '<br>• ' + formatInt(totalExpReq) + ' EXP (' + levelDiff.valueOf() + checkPlural(levelDiff, ' level', ' levels') + ')';
				} else if (data.untilOutOfMoneyCheck == 1 && data.currentInfamyLevel.greaterThan(0)) {
					const calcPoorOutput = calcInfamiesUntilPoor(data.currentInfamyLevel, [data.currentMoney, avgMoneyGains]);
					
					if (calcPoorOutput.infsWithPassive.greaterThan(0)) {
						totalExpReq = totalExpReq.add(NotoExpReqTotal(data.currentLevel, 100));
						if (calcPoorOutput.infsWithPassive.greaterThan(1)) {
							totalExpReq = totalExpReq.add(NotoExpReqTotal(1, 100).times(calcPoorOutput.infsWithPassive.sub(1)));
						}
					}
					outputString += "At Infamy " + toRomanWithSeparator(data.currentInfamyLevel, '', data.toggleRomanNumerals_Global && data.currentInfamyLevel.greaterThan(0), false /*data.currentInfamyLevel > 0*/) + " with currently <span class='NotorietyEXPCalculator_Money'>$" + formatInt(data.currentMoney) + '</span> and average gains of ' + formatInt(avgExpGains) + " EXP per run and <span class='NotorietyEXPCalculator_Money'>$" + formatInt(avgMoneyGains) + '</span> per infamy (based on runs required for enough exp), the following can be achieved:';
					outputString += '<br>• Infamies: ' + formatInt(calcPoorOutput.infs) + ' (passive: ' + formatInt(calcPoorOutput.passiveInfs) + ' | total: ' + formatInt(calcPoorOutput.infsWithPassive) + ')';
					outputString += '<br>• Reach Infamy ' + toRomanWithSeparator(data.currentInfamyLevel.add(calcPoorOutput.infsWithPassive), '', data.toggleRomanNumerals_Global && (data.currentInfamyLevel.add(calcPoorOutput.infsWithPassive)).greaterThan(0), false /*data.currentInfamyLevel > 0*/) + ' for totals of <b>' + formatInt(totalExpReq) + "</b> EXP and <span class='NotorietyEXPCalculator_Money'>$" + formatInt(calcPoorOutput.totalCostWithPassive) + "</span> (leftover: <span class='NotorietyEXPCalculator_Money'>$" + formatInt(calcPoorOutput.remainingMoney) + '</span>)';
				} else {
					outputString += "To go from Level " + toRomanWithSeparator(data.currentInfamyLevel, data.currentLevel, data.toggleRomanNumerals_Global && data.currentInfamyLevel.greaterThan(0), true /*data.currentInfamyLevel > 0*/) + ' to ' + toRomanWithSeparator(data.goalInfamyLevel, data.goalLevel, data.toggleRomanNumerals_Global && data.goalInfamyLevel.greaterThan(0), true /*data.goalInfamyLevel > 0*/);
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						outputString += "assuming average gains of " + formatInt(avgExpGains) + " EXP and average playtime of " + avgTimeOutput.formatAmount() + " (including extra time) per run"
					}
					outputString += ', the following are required:';
					var currentLevel_Temp = data.currentLevel, goalLevel_Temp = data.goalLevel;
					var infamyLevelDiff = data.goalInfamyLevel.sub(data.currentInfamyLevel).abs();
					if (infamyLevelDiff.greaterThan(0)) {
						// gets exp req to very next infamy
						totalExpReq = totalExpReq.add(NotoExpReqTotal(data.currentLevel, 100));
						
						// last infamy until desired level
						if (infamyLevelDiff.greaterThan(1)) {
							totalExpReq = totalExpReq.add(NotoExpReqTotal(1, 100).times(infamyLevelDiff.sub(1)));
						}
					}
					totalExpReq = totalExpReq.add(NotoExpReqTotal(1, data.goalLevel));
					
					if (data.remainingEXP.notEquals(0)) {
						var nextLevelReq = NotoExpReqTotal(data.currentLevel.min(data.goalLevel), data.currentLevel.min(data.goalLevel).add(1));
						totalExpReq = totalExpReq.sub(nextLevelReq.min(data.remainingEXP.sub(nextLevelReq).abs()));
					}
					
					outputString += '<br>• <b>' + formatInt(totalExpReq) + '</b> EXP';
					var infamyMoneyReq = calcInfamyMoneyReq_v2(data.currentInfamyLevel, data.goalInfamyLevel, data.cheaperPassCheck, [data.currentMoney, rotationInputsCalculated.money], data.preMoneyCapCheck);
					if (rotationInputsCalculated.money.equals(0)) {
						infamyMoneyReq = infamyMoneyReq.sub(data.currentMoney);
					}
					outputString += "<br>• <span class='NotorietyEXPCalculator_Money'>$" + formatInt(infamyMoneyReq.max(0)) + '</span> money (excluding current money)';
					if (infamyMoneyReq.lessThan(0)) {
						outputString += " (using up <span class='NotorietyEXPCalculator_Money'>$" + formatInt(infamyMoneyReq.abs().sub(data.currentMoney).abs()) + "</span> with <span class='NotorietyEXPCalculator_Money'>$" + formatInt(infamyMoneyReq.abs()) + '</span> remaining)';
					} else if (infamyMoneyReq.greaterThan(0)) {
						forEXPOnlyNote = true;
					}
				}
				break;
			case 1:
				const avgMxpGains = rotationInputsCalculated.mxp.dividedBy(rotationInputsCalculated.includedRuns);
				if (data.untilMXPUsage.equals(0)) {
					const orig = calcMXPReq({untilMXP: false}, {currentRank:data.currentMutatorRank, goalRank:data.goalMutatorRank, remainingMXP:data.remainingMXP});
					totalMxpReq = totalMxpReq.add(orig);
					outputString += "To go from <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(data.currentMutatorRank) + "</span> to <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.goalMutatorRank) + "</span> "
					if (data.remainingMXP.greaterThan(0)) {
						outputString += " with <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.remainingMXP) + " MXP</span> remaining until the next rank, ";
					}
					outputString += " the requirement is <span class='NotorietyEXPCalculator_MXP'>" + formatInt(totalMxpReq) + " MXP</span>.";
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						outputString += " Assuming average gains of <span class='NotorietyEXPCalculator_MXP'>" + formatInt(avgMxpGains) + " MXP</span> and average playtime of " + avgTimeOutput.formatAmount() + " (including extra time) per run:";
					}
				} else if (data.untilMXPUsage.greaterThan(0)) {
					const orig = calcMXPReq({untilMXP: true}, {currentRank:data.currentMutatorRank, remainingMXP:data.remainingMXP, extraMXP:data.untilMXPUsage});
					outputString += "At <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(data.currentMutatorRank) + "</span>";
					if (data.remainingMXP.greaterThan(0)) {
						outputString += " with <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.remainingMXP) + " MXP</span> remaining until the next rank, ";
					} else {
						outputString += ',';
					}
					totalMxpReq = totalMxpReq.add(data.untilMXPUsage);
					outputString += " gaining another <span class='NotorietyEXPCalculator_MXP'>" + formatInt(data.untilMXPUsage) + " MXP</span> will reach:";
					outputString += "<br>• <span class='NotorietyEXPCalculator_MXP'>Mutator Rank " + formatInt(orig.newRank) + "</span> (+" + formatInt(orig.extraRanks) + ")";
					outputString += "<br>• Leftover <span class='NotorietyEXPCalculator_MXP'>MXP</span>: " + formatInt(orig.leftoverMXP) + "</span>";
					if (rotationInputsCalculated.includedRuns.greaterThan(0)) {
						outputString += "<p/>Assuming average gains of <span class='NotorietyEXPCalculator_MXP'>" + formatInt(avgMxpGains) + " MXP</span> and average playtime of " + avgTimeOutput.formatAmount() + " (including extra time) per run:";
					}
				} else {
					outputString += "Wait a minute, how did this happen? We're smarter than this.";
				}
			}
		switch (data.toggleComputationType_Global) {
		case 0:
			if (rotationInputsCalculated.includedRuns.notEquals(0)) {
				const timeOutput = new Timer();
				timeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][data.toggleTimeOutputFormat_Global];
				if (totalExpReq.dividedBy(rotationInputsCalculated.exp).equals(0) || totalExpReq.equals(0)) {
					timeOutput.amount = new Decimal(0);
				} else {
					timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime)).times(totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil());
				}
				var rotationsReq = totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil();
				if (rotationsReq.isNan() == true) {
					rotationsReq = new Decimal(0);
				}
				if (totalExpReq.notEquals(0)) {
					if (forEXPOnlyNote == true) {
						outputString += '<br>• For EXP only: <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil(), ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
						outputString += '<br>• For EXP only: <b>' + timeOutput.formatAmount() + '</b> playtime';
					} else {
						outputString += '<br>• <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(totalExpReq.dividedBy(rotationInputsCalculated.exp).ceil(), ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
						outputString += '<br>• <b>' + timeOutput.formatAmount() + '</b> playtime';
					}
				}
			}
		break;
		case 1:
			if (rotationInputsCalculated.includedRuns.notEquals(0)) {
				const timeOutput = new Timer();
				timeOutput.config = ['digital', 'words', 'wordsShort', 'wordsShorter'][data.toggleTimeOutputFormat_Global];
				if (totalMxpReq.dividedBy(rotationInputsCalculated.mxp).equals(0) || totalMxpReq.equals(0)) {
					timeOutput.amount = new Decimal(0);
				} else {
					timeOutput.amount = new Decimal(1e3).times(rotationInputsCalculated.time.add(rotationInputsCalculated.extraTime)).times(totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil());
				}
				var rotationsReq = totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil();
				if (rotationsReq.isNan() == true) {
					rotationsReq = new Decimal(0);
				}
				outputString += '<br>• <b>' + formatInt(rotationsReq) + '</b>' + checkPlural(totalMxpReq.dividedBy(rotationInputsCalculated.mxp).ceil(), ' rotation', ' rotations') + ' of <b>' + formatInt(rotationInputsCalculated.includedRuns) + '</b>' + checkPlural(rotationInputsCalculated.includedRuns, ' run', ' runs');
				outputString += '<br>• <b>' + timeOutput.formatAmount() + '</b> playtime';
			}
		}
		elem.outputResults.innerHTML = outputString;
	}
	computeBeepBoop();
	
	elem.calculateButton.addEventListener('click', function() {
		computeBeepBoop();
	});
}());