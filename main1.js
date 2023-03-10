app.import(function(lib, game, ui, get, ai, _status, app) {

	game.ui_identityShow_update = function() {
		var identityShow = game.ui_identityShow;
		var str = '';
		if (lib.config.mode == 'guozhan' || (lib.config.mode == 'versus' && get.config('versus_mode') == 'siguo') || (lib.config.mode == 'versus' && get.config('versus_mode') == 'jiange')) {

			var unknown = game.countPlayer(function(current) {
				return current.identity == 'unknown';
			})
			var wei = game.countPlayer(function(current) {
				return current.identity == 'wei';
			})
			var shu = game.countPlayer(function(current) {
				return current.identity == 'shu';
			})
			var wu = game.countPlayer(function(current) {
				return current.identity == 'wu';
			})
			var qun = game.countPlayer(function(current) {
				return current.identity == 'qun';
			})
			var jin = game.countPlayer(function(current) {
				return current.identity == 'jin';
			})
			var ye = game.countPlayer(function(current) {
				return current.identity == 'ye';
			})
			var key = game.countPlayer(function(current) {
				return current.identity == 'key';
			})
			if (unknown > 0) str += '<font color="#FFFFDE">' + get.translation('unknown') + '</font> x ' + unknown + '  ';
			if (wei > 0) str += '<font color="#0075FF">' + get.translation('wei') + '</font> x ' + wei + '  ';
			if (shu > 0) str += '<font color="#ff0000">' + get.translation('shu') + '</font> x ' + shu + '  ';
			if (wu > 0) str += '<font color="#00ff00">' + get.translation('wu') + '</font> x ' + wu + '  ';
			if (qun > 0) str += '<font color="#ffff00">' + get.translation('qun') + '</font> x ' + qun + '  ';
			if (jin > 0) str += '<font color="#9e00ff">' + get.translation('jin') + '</font> x ' + jin + '  ';
			if (ye > 0) str += '<font color="#9e00ff">' + get.translation('ye') + '</font> x ' + ye + '  ';
			if (key > 0) str += '<font color="#9e00ff">' + get.translation('key') + '</font> x ' + key + '  ';
		} else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'two') {
			var enemy = game.countPlayer(function(current) {
				return current.isEnemyOf(game.me);
			})
			var friend = game.countPlayer(function(current) {
				return current.isFriendOf(game.me);
			})
			if (enemy > 0) str += '<font color="#ff0000">' + '???' + '</font> x ' + enemy + '  ';
			if (friend > 0) str += '<font color="#00ff00">' + '???' + '</font> x ' + friend + '  ';
		} else {
			var zhu = game.countPlayer(function(current) {
				return current.identity == 'zhu' || current.identity == 'rZhu' || current.identity == 'bZhu';
			})
			var zhong = game.countPlayer(function(current) {
				return current.identity == 'zhong' || current.identity == 'rZhong' || current.identity == 'bZhong' || current.identity == 'mingzhong';
			})
			var fan = game.countPlayer(function(current) {
				return current.identity == 'fan' || current.identity == 'rYe' || current.identity == 'bYe';
			})
			var nei = game.countPlayer(function(current) {
				return current.identity == 'nei' || current.identity == 'rNei' || current.identity == 'bNei';
			})
			if (zhu > 0) str += '<font color="#ae5f35">' + get.translation('zhu') + '</font> x ' + zhu + '  ';
			if (zhong > 0) str += '<font color="#e9d765">' + get.translation('zhong') + '</font> x ' + zhong + '  ';
			if (fan > 0) str += '<font color="#87a671">' + get.translation('fan') + '</font> x ' + fan + '  ';
			if (nei > 0) str += '<font color="#9581c4">' + get.translation('nei') + '</font> x ' + nei;
		}

		str += '<br>' + get.translation(game.me.identity + '_win_option');

		if (lib.device == 'ios' || lib.device == 'android') {
			identityShow.innerHTML = '<span style="font-family:shousha; font-size: 17.0px; font-weight: 700; text-align: right; line-height: 20px; color: #D8D0D0; -webkit-text-stroke: 0.8px #383018; text-shadow:-0.8px -0.8px 1px #2b1f19???0.8px 0.8px 1px #2b1f19;">' + str + '</span>';
		} else {
			identityShow.innerHTML = '<span style="font-family:shousha; font-size: 17.5px; font-weight: 700; text-align: right; line-height: 20px; color: #958371; text-shadow:-0.8px -0.8px 1px #2b1f19???0.8px 0.8px 1px #2b1f19;">' + str + '</span>';
		}

	}
	game.ui_identityShow_init = function() {
		if (game.ui_identityShow == undefined) {
			game.ui_identityShow = ui.create.div('', '???????????????......');
			game.ui_identityShow.style.top = '1.9px';
			//game.ui_identityShow.style.left='calc(100% - 1122px)';
			game.ui_identityShow.style.left = '63.5px';
			game.ui_identityShow.style['z-index'] = 4;
			if (lib.config.mode != 'doudizhu') {
				ui.arena.appendChild(game.ui_identityShow);
			}
		}
	}
	lib.arenaReady.push(function() {
		if (lib.config.mode == 'identity' || lib.config.mode == 'th_mougong' || lib.config.mode == 'doudizhu' || lib.config.mode == 'guozhan' || lib.config.mode == 'versus' || lib.config.mode == 'single' || lib.config.mode == 'boss') {
			/*?????????*/
			if (lib.config.mode == 'doudizhu') {
				var jiaojia = ui.create.node('div');
				jiaojia.innerText = "????????????"
				jiaojia.style.cssText = "display: line;position: absolute;top: 5px;color: white;left: 56px;font-size:16.5px;font-family:shousha;text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19; z-index:1; "
				document.body.appendChild(jiaojia);
				var douzi = ui.create.node('div');
				douzi.innerText = get.translation(innerText = (num = ['100', '200', '300', '600', '900']).randomGet(1));
				douzi.style.cssText = "display: block;position: absolute;top: -7px;color: gold;left: 141px;font-size:21px;font-family:shousha;font-weight: 900; "
				ui.arena.appendChild(douzi);
			} else if (lib.config.mode == 'single') {
				//??????
				var translate = {
					zhu: '????????????',
					fan: '????????????',
					undefined: '???????????????',
				}
			} else if (lib.config.mode == 'boss') {
				//??????
				var translate = {
					zhu: '????????????',
					cai: '????????????',
					undefined: '???????????????',
				}
			} else if (lib.config.mode == 'guozhan') {
				//??????
				var translate = {
					undefined: '???????????????',
					unknown: '????????????',
					ye: '????????????<br>??????????????????',
					key: '????????????<br>??????????????????',
				}
				for (var i = 0; i < lib.group.length; i++) {
					translate[lib.group[i]] = '????????????<br>???' + get.translation(lib.group[i]) + '????????????';
				}
			} else if (lib.config.mode == 'identity' && get.config('identity_mode') == 'purple') {
				//?????????3v3v2
				var translate = {
					rZhu: '??????????????????<br>??????????????????',
					rZhong: '??????????????????<br>??????????????????<br>??????????????????',
					rYe: '?????????????????????<br>??????????????????',
					rNei: '??????????????????<br>??????????????????<br>??????????????????',
					bZhu: '??????????????????<br>??????????????????',
					bZhong: '??????????????????<br>??????????????????<br>??????????????????',
					bYe: '?????????????????????<br>??????????????????',
					bNei: '??????????????????<br>??????????????????<br>??????????????????',
				}
			} else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'two' && !get.config('replace_character_two')) {
				//?????????????????????
				var translate = {
					undefined: '????????????<br>??????????????????',
				}
			} else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'two' && get.config('replace_character_two')) {
				//???????????????????????????????????????
				var translate = {
					undefined: '??????????????????<br>??????????????????',
				}
			} else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'jiange') {
				//??????-??????
				var translate = {
					wei: '????????????<br>???????????????',
					shu: '????????????<br>???????????????',
				}
			} else if (lib.config.mode == 'versus' && get.config('versus_mode') == 'siguo') {
				//??????-????????????????????????
				var translate = {

				}
				for (var i = 0; i < lib.group.length; i++) {
					translate[lib.group[i]] = '?????????????????????<br>???' + get.translation(lib.group[i]) + '????????????';
				}
			} else {
				//????????????????????????
				var translate = {
					zhu: '??????????????????<br>??????????????????',
					zhong: '????????????<br>??????????????????',
					fan: '??????????????????<br>??????????????????',
					nei: '??????????????????<br>??????????????????',
					mingzhong: '????????????<br>??????????????????',
					undefined: '????????????',
				}
			}
			for (var i in translate) {
				lib.translate[i + '_win_option'] = translate[i];
			}
			game.ui_identityShow_init();
			setInterval(function() {
				game.ui_identityShow_update();
			}, 1000);
		}
	});





	var head = ui.create.node('img');
	head.src = lib.assetURL + "extension/??????ui/lbtn/images/SSCD/button.png"
	head.style.cssText = "display: block;--w: 130px;--h: calc(var(--w) * 1080/1434);width: var(--w);height: var(--h);position: absolute;bottom: calc(100% - 98px);left: calc(100% - 126.2px);background-color: transparent;z-index:1"
	document.body.appendChild(head);

	var liaotian = ui.create.node('img');
	liaotian.src = lib.assetURL + "extension/??????ui/lbtn/images/uibutton/liaotian.png"
	liaotian.style.cssText = "display: block;--w: 135px;--h: calc(var(--w) * 1019/1400);width: var(--w);height: var(--h);position: absolute;top: calc(100% - 97px);right: calc(100% - 129px);background-color: transparent;z-index:3"
	liaotian.onclick = function() {

		if (lib.config['extension_??????_enable']) {

			game.showChatWordBackground();

		} else {

			game.showChatWordBackgroundX();

		}

	}
	document.body.appendChild(liaotian);

	var head = ui.create.node('div');
	head.style.cssText = "display: block;width: 134px;height: 103px;position: absolute;top: 0px;right: -8px;background-color: transparent;z-index:1"
	head.onclick = function() {
		game.playAudio('../extension/??????ui/lbtn/images/SSCD/label.mp3');
		var popuperContainer = ui.create.div('.popup-container', {
			background: "rgb(0,0,0,0)"
		}, ui.window);
		popuperContainer.addEventListener('click', event => {

			game.playAudio('../extension/??????ui/lbtn/images/SSCD/caidan.mp3');
			event.stopPropagation();
			popuperContainer.delete(200);
		});
		var yemian = ui.create.div('.yemian', popuperContainer);
		var shezhi = ui.create.div('.shezhi', popuperContainer);
		shezhi.addEventListener('click', event => {
			game.playAudio('../extension/??????ui/lbtn/images/SSCD/xuanzhe.mp3');
			if (!ui.click.configMenu) return;
			game.closePopped();
			game.pause2();
			ui.click.configMenu();
			ui.system1.classList.remove('shown');
			ui.system2.classList.remove('shown');
		});
		var tuichu = ui.create.div('.tuichu', popuperContainer);
		tuichu.addEventListener('click', event => {
			game.playAudio('../extension/??????ui/lbtn/images/SSCD/xuanzhe.mp3');
			window.location.reload();
		});
		var taopao = ui.create.div('.taopao', popuperContainer);
		taopao.addEventListener('click', event => {

			game.playAudio('../extension/??????ui/lbtn/images/SSCD/xuanzhe.mp3');

			game.reload();
		});
		var touxiang = ui.create.div('.touxiang', popuperContainer);
		touxiang.addEventListener('click', event => {

			game.playAudio('../extension/??????ui/lbtn/images/SSCD/xuanzhe.mp3');

			game.over();
		});
		var tuoguan = ui.create.div('.tuoguan', popuperContainer);
		tuoguan.addEventListener('click', event => {

			game.playAudio('../extension/??????ui/lbtn/images/SSCD/xuanzhe.mp3');

			ui.click.auto();
		});
	}
	document.body.appendChild(head);

	/*??????????????????*/
	var tipshow = ui.create.node('img');
	if (lib.config.mode == 'doudizhu') tipshow.src = lib.assetURL + "extension/??????ui/lbtn/images/uibutton/doudizhu.png";
	else tipshow.src = lib.assetURL + "extension/??????ui/lbtn/images/uibutton/shenfen.png";
	if (lib.config.mode == 'doudizhu') {
		tipshow.style.cssText = "display: block;width: 360px;height: 35px;position: absolute;top: -1.3px;left: -35px;background-color: transparent;z-index:3"
	} else tipshow.style.cssText = "display: block;--w: 439px;--h: calc(var(--w) * 279/2139);width: var(--w);height: var(--h);position: absolute;top: -1px;left:-49px;background-color: transparent;z-index:3"

	if (lib.config.mode == 'identity' || lib.config.mode == 'doudizhu' || lib.config.mode == 'versus' || lib.config.mode == 'guozhan') {
		tipshow.onclick = function() {
			var popuperContainer = ui.create.div('.popup-container', ui.window);
			game.playAudio('../extension/??????ui/lbtn/images/SSCD/label.mp3');
			if (lib.config.mode == 'identity') {
				if (game.me.identity == 'zhu') {
					ui.create.div('.sfrwzhugong', popuperContainer);
				} else if (game.me.identity == 'zhong') {
					ui.create.div('.sfrwchongchen', popuperContainer);
				} else if (game.me.identity == 'fan') {
					ui.create.div('.sfrwfanzei', popuperContainer);
				} else if (game.me.identity == 'nei') {
					ui.create.div('.sfrwneijian', popuperContainer);
				}
			}
			if (lib.config.mode == 'doudizhu') {
				if (game.me.identity == 'zhu') {
					ui.create.div('.sfrwdizhu', popuperContainer);
				} else if (game.me.identity == 'fan') {
					ui.create.div('.sfrwnongmin', popuperContainer);
				}
			}
			if (lib.config.mode == 'versus') {
				ui.create.div('.sfrwhu', popuperContainer);
			}
			if (lib.config.mode == 'guozhan') {
				if (game.me.group == 'unknown' || game.me.group == 'undefined') {
					ui.create.div('.sfrwundefined', popuperContainer);
				} else if (game.me.group == 'wei') {
					ui.create.div('.sfrwweiguo', popuperContainer);
				} else if (game.me.group == 'shu') {
					ui.create.div('.sfrwshuguo', popuperContainer);
				} else if (game.me.group == 'wu') {
					ui.create.div('.sfrwwuguo', popuperContainer);
				} else if (game.me.group == 'qun') {
					ui.create.div('.sfrwqunxiong', popuperContainer);
				} else if (game.me.group == 'jin') {
					ui.create.div('.sfrwjinguo', popuperContainer);
				} else if (game.me.group == 'ye') {
					ui.create.div('.sfrwyexinjia', popuperContainer);
				}
			}
			popuperContainer.addEventListener('click', event => {
				game.playAudio('../extension/??????ui/lbtn/images/SSCD/caidan.mp3');
				popuperContainer.delete(200);
			});
		};
	}
	document.body.appendChild(tipshow);

	if (lib.device == 'ios' || lib.device == 'android') {
		var head = ui.create.node('div');
		head.innerText = "?????????:"
		head.style.cssText = "display: block;position: absolute;top: 85px;color: #97856a;right: 135px;font-size:18px;letter-spacing: 1.5px;font-family:shousha;;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;-webkit-text-stroke:0.5px black !important; z-index:1; "
		document.body.appendChild(head);

		var head = ui.create.node('div');
		head.innerText = num = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		head.style.cssText = "display: block;position: absolute;top: 85px;right: 58px;font-size:20px;font-family:'shousha';color:#97856a;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;-webkit-text-stroke:0.5px black !important; z-index:1"
		document.body.appendChild(head);

	} else {
		var head = ui.create.node('div');
		head.innerText = "?????????:"
		head.style.cssText = "display: block;position: absolute;top: 85px;color: #97856a;right: 135px;font-size:18px;letter-spacing: 1.5px;font-family:shousha;;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;z-index:1; "
		document.body.appendChild(head);

		var head = ui.create.node('div');
		head.innerText = num = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
		head.style.cssText = "display: block;position: absolute;top: 85px;right: 58px;font-size:20px;font-family:'shousha';color:#97856a;font-weight: 900; text-shadow:-1.7px 0px 2.5px #2b1f19, 0px -1.7px 2.5px #2b1f19, 1.7px 0px 2.5px #2b1f19 ,0px 1.7px 2.5px #2b1f19;z-index:1"
		document.body.appendChild(head);
	}



	var plugin = {
		name: 'lbtn',
		filter: function() {
			return !['chess', 'tafang', 'stone', 'connect'].contains(get.mode());
		},
		content: function(next) {
			lib.skill._uicardupdate = {
					trigger: {
						player: 'phaseJieshuBegin'
					},
					forced: true,
					unique: true,
					popup: false,
					silent: true,
					noLose: true,
					noGain: true,
					noDeprive: true,
					priority: -Infinity,
					filter: function(event, player) {
						return player == game.me
					},
					content: function() {
						if (ui.updateSkillControl) ui.updateSkillControl(game.me, true);
					}
				},

				/*???????????? ????????????*/
				lib.skill._paixu_paixu_paixu = {
					trigger: {
						player: ["gainEnd"]
					},
					silent: true,
					charlotte: true,
					forced: true,
					content: function() {
						if (window.paixuxx == false && player == game.me) {
							var cards = game.me.getCards("hs");
							var sort2 = function(b, a) {
								if (a.name != b.name) return lib.sort.card(a.name, b.name);
								else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
								else return a.number - b.number;
							};
							if (cards.length > 1) {
								cards.sort(sort2);
								cards.forEach(function(i, j) {
									game.me.node.handcards1.insertBefore(cards[j], game.me.node.handcards1.firstChild);
								});
								dui.queueNextFrameTick(dui.layoutHand, dui);
							}
						}
					},
				},



				app.waitAllFunction([
					function(next) {

						game.saveConfig('custom_button', false);
						next();
					},
					function(next) {
						if (lib.device == 'ios' || lib.device == 'android') {
							lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1', next);
						} else {
							lib.init.css(lib.assetURL + 'extension/' + app.name + '/' + plugin.name, 'main1', next);
						}

					},
				], next);

		},
		precontent: function() {
			app.reWriteFunction(game, {
				updateRoundNumber: [function() {
					if (ui.cardRoundTime) {
						ui.cardRoundTime.updateRoundCard();


					}
				}],
			});
			Object.assign(game.videoContent, {
				createCardRoundTime: function() {
					ui.cardRoundTime = plugin.create.cardRoundTime();
				},
				createhandcardNumber: function() {
					ui.handcardNumber = plugin.create.handcardNumber();
				},
				updateCardRoundTime: function(opts) {
					if (!ui.cardRoundTime) return;
					ui.cardRoundTime.node.roundNumber.innerHTML = '<span>???' + game.roundNumber + '???</span>';
					ui.cardRoundTime.setNumberAnimation(opts.cardNumber);
				},
				updateCardnumber: function(opts) {
					if (!ui.handcardNumber) return;

					// ui.handcardNumber.setNumberAnimation(opts.cardNumber);
				},

			});
			app.reWriteFunction(ui.create, {
				me: [function() {
					plugin.create.control();
				}, null],
				arena: [null, function() {
					if (ui.time3) {
						clearInterval(ui.time3.interval);
						ui.time3.delete();
					}
					if (ui.cardPileNumber) ui.cardPileNumber.delete();
					ui.cardRoundTime = plugin.create.cardRoundTime();
					ui.handcardNumber = plugin.create.handcardNumber();
				}],
				cards: [null, function() {
					if (ui.cardRoundTime) {
						ui.cardRoundTime.updateRoundCard();

					}
				}],



			});
			app.reWriteFunction(lib.configMenu.appearence.config, {
				update: [null, function(res, config, map) {
					map.control_style.hide();
					map.custom_button.hide();
					map.custom_button_system_top.hide();
					map.custom_button_system_bottom.hide();
					map.custom_button_control_top.hide();
					map.custom_button_control_bottom.hide();
					map.radius_size.hide();
				}],
			});


			ui.create.confirm = function(str, func) {
				var confirm = ui.confirm;
				if (!confirm) {
					confirm = ui.confirm = plugin.create.confirm();
				}
				confirm.node.ok.classList.add('disabled');
				confirm.node.cancel.classList.add('disabled');
				if (_status.event.endButton) {
					ui.confirm.node.cancel.classList.remove('disabled');
				}
				if (str) {
					if (str.indexOf('o') !== -1) {
						confirm.node.ok.classList.remove('disabled');
					}
					if (str.indexOf('c') !== -1) {
						confirm.node.cancel.classList.remove('disabled');
					}
					confirm.str = str;
				}

				if (func) {
					confirm.custom = func;
				}
				ui.updatec();
				confirm.update();
			};
		},
		create: {
			control: function() {

			},
			confirm: function() {
				//????????????    
				var confirm = ui.create.control('<span></span>', 'cancel');
				confirm.classList.add('lbtn-confirm');
				confirm.node = {
					ok: confirm.firstChild,
					cancel: confirm.lastChild,

					//?????????
					//cancel2: confirm.lastChild,

				};
				if (_status.event.endButton) {
					_status.event.endButton.close();
					//	delete event.endButton;		
				}
				confirm.node.ok.link = 'ok';
				confirm.node.ok.classList.add('primary');
				confirm.node.cancel.classList.add('primary2');

				confirm.node.cancel.innerHTML = "<image style=width: 80px height 15px src=" + lib.assetURL + "extension/??????ui/lbtn/images/uibutton/QX.png>";

				// confirm.node.cancel2.classList.add('primary2');

				confirm.custom = plugin.click.confirm;
				app.reWriteFunction(confirm, {
					close: [function() {
						this.classList.add('closing');
					}],
				});
				for (var k in confirm.node) {
					confirm.node[k].classList.add('disabled');
					confirm.node[k].removeEventListener(lib.config.touchscreen ? 'touchend' : 'click', ui.click.control);
					confirm.node[k].addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function(e) {
						e.stopPropagation();
						if (this.classList.contains('disabled')) {
							if (this.link === 'cancel' && this.dataset.type === 'endButton' && _status.event.endButton) {

								_status.event.endButton.custom();
								ui.confirm.close();
								//  ui.updatec();
							}
							return;
						}

						if (this.parentNode.custom) {
							this.parentNode.custom(this.link, this);
						}
					});
				}

				//????????????????????????
				if (ui.skills2 && ui.skills2.skills.length) {
					var skills = ui.skills2.skills;
					confirm.skills2 = [];
					for (var i = 0; i < skills.length; i++) {
						var item = document.createElement('div');
						item.link = skills[i];

						if (skills[i] == "_chongzhu") {
							item.innerHTML = "<img style=width:70px height:15px src=" + lib.assetURL + "extension/??????ui/lbtn/images/uibutton/CZ.png>";
						} else {
							item.innerHTML = get.translation(skills[i]);
						}

						item.addEventListener(lib.config.touchscreen ? 'touchend' : 'click', function(e) {
							e.stopPropagation();
							ui.click.skill(this.link);
						});

						item.dataset.type = 'skill2';
						/*
						                         if(ui.updateSkillControl)   ui.updateSkillControl(game.me, true);*/
						confirm.insertBefore(item, confirm.firstChild);
					}
				}

				confirm.update = function() {
					if (confirm.skills2) {
						if (_status.event.skill && _status.event.skill !== confirm.dataset.skill) {
							confirm.dataset.skill = _status.event.skill;
							confirm.skills2.forEach(function(item) {
								item.remove();
							});
							ui.updatec();
						} else if (!_status.event.skill && confirm.dataset.skill) {
							delete confirm.dataset.skill;
							confirm.skills2.forEach(function(item) {
								confirm.insertBefore(item, confirm.firstChild);
							});
							ui.updatec();
						}
					}
					if (ui.updateSkillControl) ui.updateSkillControl(game.me, true);
				};
				return confirm;
			},


			handcardNumber: function() {
				var node3 = ui.create.div('.settingButton', ui.arena, plugin.click.setting);
				var node2 = ui.create.div('.lbtn-controls', ui.arena);
				/*ui.create.div('.lbtn-control1', node2, plugin.click.paixu);*/
				var paixuauto = ui.create.div('.lbtn-paixu', ui.arena);
				paixuauto.onclick = function() {
					if (window.paixuxx == false) {
						plugin.click.paixu();
						paixuauto.setBackgroundImage('extension/??????ui/lbtn/images/uibutton/btn-paixu.png');
						window.paixuxx = true;
					} else {
						plugin.click.paixu();
						paixuauto.setBackgroundImage('extension/??????ui/lbtn/images/uibutton/zidongpaixu.png');
						window.paixuxx = false;
					}
				};
				var jilu = ui.create.div('.latn-jilu', ui.arena, ui.click.pause);
				//-----------------//
				/*ui.create.div('.lbtn-control2', node2, ui.click.pause);*/
				//var node4 = ui.create.div('.tuoguanButton', ui.arena, ui.click.auto);
				var node = ui.create.div('.handcardNumber', ui.arena).hide();
				node.node = {
					cardPicture: ui.create.div('.cardPicture', node),
					cardNumber: ui.create.div('.cardNumber', node),

				};
				//??????????????---//
				node.updateCardnumber = function() {
					if (!game.me) return;

					var cardNumber2 = game.me.countCards('h') || 0;
					var cardNumber = game.me.getHandcardLimit() || 0;
					var numbercolor = '#eedec5';
					if (cardNumber > game.me.hp) numbercolor = '#20c520';
					if (cardNumber < game.me.hp) numbercolor = '#99241c';
					if (cardNumber == Infinity) cardNumber = '???'
					this.node.cardNumber.innerHTML = /*'</span>' */ '<span style="border: none;box-shadow: none;font-size: 19px;font-weight: bold;text-shadow:0px 0px 1px #000000">' + '<span style="font-size:25px; color:#FDFDFD; font-family:HYZLSJ;-webkit-text-stroke: 2.0px #000201;">' + '<b>' + cardNumber2 + '</b>' + '</span>' + '<span style="font-size:23px;font-weight:400;font-family:xingkai;-webkit-text-stroke: 2.3px #000201;">' + '<b>' + '/' + '</b>' + '</span>' + '<font  size=4 color=' + numbercolor + ' face="HYZLSJ">' + '<b>' + cardNumber + '</b>' + '</font>' + '</span>';
					//      this.setNumberAnimation(cardNumber);
					this.show();

					game.addVideo('updateCardnumber', null, {
						cardNumber: cardNumber,
					});
				};
				node.node.cardNumber.interval = setInterval(function() {
					ui.handcardNumber.updateCardnumber()
				}, 1000);
				//    game.addVideo('createCardRoundTime');
				game.addVideo('createhandcardNumber');
				return node;
			},
			cardRoundTime: function() {
				var node = ui.create.div('.cardRoundNumber', ui.arena).hide();
				node.node = {
					/*cardPileNumber: ui.create.div('.cardPileNumber', node),*/
					//???????????????
					cardPileNumber: ui.create.div('.cardPileNumber', node, plugin.click.paidui),
					roundNumber: ui.create.div('.roundNumber', node),
					time: ui.create.div('.time', node),
				};

				node.updateRoundCard = function() {
					var cardNumber = ui.cardPile.childNodes.length || 0;
					var roundNumber = game.roundNumber || 0;
					this.node.roundNumber.innerHTML = '<span>???' + game.roundNumber + '???</span>';
					this.setNumberAnimation(cardNumber);
					this.show();
					game.addVideo('updateCardRoundTime', null, {
						cardNumber: cardNumber,
						roundNumber: roundNumber,
					});
				};

				node.setNumberAnimation = function(num, step) {
					var item = this.node.cardPileNumber;
					clearTimeout(item.interval);
					if (!item._num) {
						item.innerHTML = '<span>' + num + '</span>';
						item._num = num;
					} else {
						if (item._num !== num) {
							if (!step) step = 500 / Math.abs(item._num - num);
							if (item._num > num) item._num--;
							else item._num++;
							item.innerHTML = '<span>' + item._num + '</span>';
							if (item._num !== num) {
								item.interval = setTimeout(function() {
									node.setNumberAnimation(num, step);
								}, step);
							}
						}
					}
				};

				ui.time4 = node.node.time;
				ui.time4.sec = 0;
				ui.time4.interval = setInterval(function() {
					var min = Math.floor(ui.time4.sec / 60);
					var sec = ui.time4.sec % 60;
					if (min < 10) min = '0' + min;
					if (sec < 10) sec = '0' + sec;
					ui.time4.innerHTML = '<span>' + min + ':' + sec + '</span>';
					ui.time4.sec++;
				}, 1000);
				game.addVideo('createCardRoundTime');
				return node;
			},
		},
		click: {
			setting: function() {
				if (lib.extensionMenu.extension_????????????.zyile_skin_Menu) {
					lib.extensionMenu.extension_????????????.zyile_skin_Menu.onclick();
				} else {
					// head.remove()
					game.closePopped();
					game.pause2();
					ui.click.configMenu();
					ui.system1.classList.remove('shown');
					ui.system2.classList.remove('shown');
				}
			},


			paixu: function() {

				var cards = game.me.getCards("hs");

				var sort2 = function(b, a) {
					if (a.name != b.name) return lib.sort.card(a.name, b.name);
					else if (a.suit != b.suit) return lib.suit.indexOf(a) - lib.suit.indexOf(b);
					else return a.number - b.number;
				};
				if (cards.length > 1) {
					cards.sort(sort2);
					cards.forEach(function(i, j) {
						game.me.node.handcards1.insertBefore(cards[j], game.me.node.handcards1.firstChild);
					});
					dui.queueNextFrameTick(dui.layoutHand, dui);
				}
			},
			//???????????????????????????
			paidui: function() {
				if (!_status.gameStarted) return;
				game.pause2();

				const cardsInfo = game.players.map(item => item.get('h')).flat(window.Infinity)
					.concat(...ui.cardPile.childNodes)
					.concat(...ui.discardPile.childNodes)
					.map(item => ({
						name: item.name,
						suit: item.suit,
						number: item.number,
						nature: get.translation(item.nature),
						color: get.color(item),
						type: get.translation(get.type(item), 'trick'),
						translate: lib.translate[item.name],
						link: item,
					}));
				let cardStatistics = {
					???: {
						num: 0,
						type: '??????',
					},
					??????: {
						num: 0,
						type: '??????',
					},
					??????: {
						num: 0,
						type: '??????',
					},
					??????: {
						num: 0,
						type: '??????',
					},
					??????: {
						num: 0,
						type: '??????',
					},
					'??????2~9': {
						num: 0,
						type: '??????',
					},
				}
				let typeList = ['??????', '??????'];
				for (let card of cardsInfo) {
					typeList.add(card.type);
					// ???????????????
					if (!cardStatistics[card.translate])
						cardStatistics[card.translate] = {
							num: 0,
							type: card.type,
						}
					// ????????????
					if (!cardStatistics[get.translation(card.suit)])
						cardStatistics[get.translation(card.suit)] = {
							num: 0,
							type: '??????',
						}
					// ????????????
					if (!cardStatistics[card.number])
						cardStatistics[card.number] = {
							num: 0,
							type: '??????',
						}

					if (ui.cardPile.contains(card.link)) {
						cardStatistics[card.translate].num++;
						cardStatistics[get.translation(card.suit)].num++;
						cardStatistics[card.number].num++;

						if (card.name === 'sha') {
							if (card.color === 'black') {
								cardStatistics['??????'].num++;
								if (card.suit === 'spade' && card.number <= 9 && card.number >= 2) cardStatistics['??????2~9'].num++;
							} else if (card.color === 'red') {
								cardStatistics['??????'].num++;
							}
						}

					}


					if (card.nature) {
						if (!cardStatistics[card.nature + card.translate])
							cardStatistics[card.nature + card.translate] = {
								num: 0,
								type: card.type,
							}
						if (ui.cardPile.contains(card.link)) {
							cardStatistics[card.nature + card.translate].num++;
						}
					}
				}

				let popupContainer = ui.create.div('.popup-container', ui.window, {
					zIndex: 10,
					background: 'rgb(0,0,0,.3)',
				}, function() {
					this.delete(500);
					game.resume2();
				});
				let statistics = ui.create.div('.card-statistics', '???????????????', popupContainer);
				let statisticsTitle = ui.create.div('.card-statistics-title', statistics);
				let statisticsContent = ui.create.div('.card-statistics-content', statistics);

				typeList.forEach(item => {
					ui.create.div(statisticsTitle, '', item);
					statisticsContent[item] = ui.create.div(statisticsContent, '');
				});

				for (let i in cardStatistics) {
					let items = ui.create.div('.items');
					let item = ui.create.div('.item', i, items);
					let num = ui.create.div('.item-num', `X${cardStatistics[i].num}`, items);
					statisticsContent[cardStatistics[i].type].appendChild(items);
				}

			},

			confirm: function(link, target) {
				if (link === 'ok') {
					ui.click.ok(target);
				} else if (link === 'cancel') {
					ui.click.cancel(target);
				} else if (target.custom) {
					target.custom(link);
				}
			},
		},
		compare: {
			type: function(a, b) {
				if (a === b) return 0;
				var types = ['basic', 'trick', 'delay', 'equip'].addArray([a, b]);
				return types.indexOf(a) - types.indexOf(b);
			},
			name: function(a, b) {
				if (a === b) return 0;
				return a > b ? 1 : -1;
			},
			nature: function(a, b) {
				if (a === b) return 0;
				var nature = [undefined, 'fire', 'thunder'].addArray([a, b]);
				return nature.indexOf(a) - nature.indexOf(b);
			},
			suit: function(a, b) {
				if (a === b) return 0;
				var suit = ['diamond', 'heart', 'club', 'spade'].addArray([a, b]);
				return suit.indexOf(a) - suit.indexOf(b);
			},
			number: function(a, b) {
				return a - b;
			},
		},
	};
	return plugin;
});