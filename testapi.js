const GameAPI = {
  setLockRegion(bone, radius) {
    console.log(`Lock region on ${bone} with radius ${radius}`);
  },
  setLockSmoothness(value) {
    console.log(`Set lock smoothness to ${value}`);
  },
  getBonePosition(bone) {
    // Trả về giả định vị trí bone
    return { x: 0.1, y: 0.2, z: 0.3 };
  },
  aimAt(x, y, z, strength) {
    console.log(`Aim at (${x.toFixed(3)}, ${y.toFixed(3)}, ${z.toFixed(3)}) with strength ${strength}`);
  }
};

const NeckLockModule = {
  enabled: true,
  radius: 1.2,
  boneName: "bone_Neck",
  smoothness: 0.88,
  lockStrength: 0.96,

  stabilizeNeckRegion() {
    GameAPI.setLockRegion(this.boneName, this.radius);
    GameAPI.setLockSmoothness(this.smoothness);
  },

  adjustAimToNeck() {
    const neckPos = GameAPI.getBonePosition(this.boneName);
    const aimOffset = {
      x: neckPos.x,
      y: neckPos.y,
      z: neckPos.z + 0.015
    };
    GameAPI.aimAt(aimOffset.x, aimOffset.y, aimOffset.z, this.lockStrength);
  },

  lockNeckRegion() {
    if (!this.enabled) return;
    this.stabilizeNeckRegion();
    this.adjustAimToNeck();
  }
};

NeckLockModule.lockNeckRegion();

// Tối ưu hóa đầm tâm
function stabilizeAim() {
  const stabilize = true;
  if (stabilize) {
    decreaseRecoil();
    applyRecoilControl();
  }
}

// Giảm rung tay (giả định bạn phải định nghĩa hàm này theo API hoặc logic riêng)
function decreaseRecoil() {
  // Ví dụ: giảm độ giật xuống 20%
  GameAPI.setRecoilMultiplier && GameAPI.setRecoilMultiplier(0.2);
}

// Áp dụng điều khiển recoil
function applyRecoilControl() {
  GameAPI.enableRecoilCompensation && GameAPI.enableRecoilCompensation(true);
  GameAPI.setSmoothnessFactor && GameAPI.setSmoothnessFactor(0.85);
}

// Gọi hàm để tối ưu đầm tâm
stabilizeAim();

// Hàm theo dõi vùng cổ mục tiêu
function trackNeck() {
  const trackEnabled = true;
  if (trackEnabled) {
    trackTargetNeck();
    fineTuneAiming();
  }
}

// Hàm giả định thực hiện theo dõi vùng cổ
function trackTargetNeck() {
  // Gọi API khóa bone neck hoặc tương đương
  GameAPI.lockToBone && GameAPI.lockToBone("bone_Neck");
  GameAPI.setTrackingSmoothness && GameAPI.setTrackingSmoothness(0.9);
}

// Hàm tinh chỉnh aim
function fineTuneAiming() {
  // Có thể gọi API tinh chỉnh, hoặc xử lý thêm
  GameAPI.applyAimCorrection && GameAPI.applyAimCorrection(0.05);
}

// Gọi hàm để thực hiện bám cổ
trackNeck();

const configMap = {
  "com.recoil.control": 0.01,
  "com.bullet.trajectory.stable": 2.0,
  "com.weapon.stability": 2.5,
  "com.aim.assist.enabled": true,
  "com.aim.friction": 0.1,
  "com.aim.sensitivity": 0.4,
  "com.scope.sensitivity.override": 0.3,
  "com.headshot.bias": 3.0,
  "com.auto.fire.edge": true,
  "com.fire.touch.delay": 0.005,
  "com.bullet.speed.increase": 2.0,
  "com.scope.zoom.level": 0.8,
  "com.movement.stability": 1.5,
  "com.fire.mode.override": "auto",
  "com.trigger.sensitivity": 0.1,
  "com.ammo.refill.auto": true,
  "com.damage.boost": 2.0,
  "com.stabilizer.active": true,
  "com.aim.snap": true,
  "com.aim.snap.speed": 0.15,
  "com.scope.stability": 2.0,
  "com.recoil.recovery.time": 0.1,
  "com.bullet.wind.resistance": 1.5,
  "com.crosshair.stability": 2.0,
  "com.ammo.accuracy": 1.3,
  "com.shake.reduction": 0.02,
  "com.fire.range.optimization": true,
  "com.enemy.highlight": "enabled",
  "com.headshot.multiplier": 2.5,
};

function applyConfig(config) {
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const value = config[key];
      if (typeof value === "boolean") {
        GameAPI.setConfigBool && GameAPI.setConfigBool(key, value);
      } else if (typeof value === "number") {
        GameAPI.setConfigNumber && GameAPI.setConfigNumber(key, value);
      } else if (typeof value === "string") {
        GameAPI.setConfigString && GameAPI.setConfigString(key, value);
      } else {
        // Fallback generic setter
        GameAPI.setConfig && GameAPI.setConfig(key, value);
      }
    }
  }
}

// Áp dụng cấu hình
applyConfig(configMap);

class CloseRangeHeadLock {
  constructor() {
    this.headX = 0.0;
    this.headY = 0.0;
    this.lockDistance = 2.0; // Độ gần để kích hoạt khóa đầu
  }

  setEnemyHeadPosition(x, y) {
    this.headX = x;
    this.headY = y;
    console.log(`Enemy head position set at (${this.headX}, ${this.headY})`);
  }

  lockOn(playerX, playerY) {
    const dx = this.headX - playerX;
    const dy = this.headY - playerY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance <= this.lockDistance) {
      console.log("✅ Close-range head lock activated! Precise tracking in effect.");
      this.activateTracking();
    } else {
      console.log("⚠️ Target too far. Close-range lock not triggered.");
    }
  }

  activateTracking() {
    // Gọi API Free Fire khóa bone head và thiết lập tracking mượt mà
    if (typeof GameAPI !== 'undefined') {
      if (GameAPI.lockToBone) GameAPI.lockToBone("head_joint");
      if (GameAPI.setTrackingSmoothness) GameAPI.setTrackingSmoothness(0.92);
      if (GameAPI.enableSnapAim) GameAPI.enableSnapAim(true);
      if (GameAPI.setSnapSpeed) GameAPI.setSnapSpeed(0.15);
    }
  }
}

// Demo sử dụng
const closeLock = new CloseRangeHeadLock();
closeLock.setEnemyHeadPosition(30.0, 45.0);
closeLock.lockOn(31.2, 44.5);  // Giả lập vị trí người chơi gần đầu địch

class AimSystem {
  constructor() {
    this.aimSensitivity = 1.0; // Cấp độ nhạy của tâm
  }

  adjustAim(level) {
    this.aimSensitivity -= level; // giảm độ nhạy tâm
    if (this.aimSensitivity < 0.1) {
      this.aimSensitivity = 0.1; // đảm bảo không giảm quá mức
    }
  }

  displaySensitivity() {
    console.log(`Current aim sensitivity: ${this.aimSensitivity}`);
  }
}

// Demo sử dụng
const aim = new AimSystem();
aim.adjustAim(0.3); // giảm độ nhạy tâm đi 0.3
aim.displaySensitivity();

class HeadRegionLock {
  constructor() {
    this.targetX = 0.0;
    this.targetY = 0.0;
    this.lockThreshold = 3.0; // Độ khóa chặt trong tầm gần
  }

  setTarget(x, y) {
    this.targetX = x;
    this.targetY = y;
    console.log(`Target head region set at (${this.targetX}, ${this.targetY})`);
  }

  isLocked(currentX, currentY) {
    const distance = Math.hypot(currentX - this.targetX, currentY - this.targetY);
    return distance <= this.lockThreshold;
  }

  checkLock(currentX, currentY) {
    if (this.isLocked(currentX, currentY)) {
      console.log("Head region locked: Stable on target.");
    } else {
      console.log("Head region NOT locked: Adjusting...");
    }
  }
}

// Demo sử dụng
const lock = new HeadRegionLock();
lock.setTarget(50.0, 50.0);
lock.checkLock(52.5, 48.7);  // vị trí hiện tại để kiểm tra lock

class NeckLock {
  constructor() {
    this.neckX = 0.0;
    this.neckY = 0.0;
    this.lockRadius = 3.0; // phạm vi bám vùng cổ
  }

  setNeckPosition(x, y) {
    this.neckX = x;
    this.neckY = y;
    console.log(`Target neck position set at (${this.neckX}, ${this.neckY})`);
  }

  lockToNeck(aimX, aimY) {
    const distance = Math.hypot(this.neckX - aimX, this.neckY - aimY);
    if (distance <= this.lockRadius) {
      console.log("Locked onto the neck! Tracking steady.");
    } else {
      console.log("Not within neck lock zone. Adjusting aim...");
    }
  }
}

// Demo sử dụng
const neckTracker = new NeckLock();
neckTracker.setNeckPosition(60.0, 70.0);
neckTracker.lockToNeck(59.0, 68.8);  // tâm bám vào gần cổ

/**
 * Hàm khoá tâm ngắm vào đầu kẻ thù.
 * @param {number} inputX - Tọa độ X hiện tại của tâm ngắm
 * @param {number} inputY - Tọa độ Y hiện tại của tâm ngắm
 * @param {number} headX - Tọa độ X của đầu mục tiêu
 * @param {number} headY - Tọa độ Y của đầu mục tiêu
 * @param {number} headLockStrength - Mức độ khoá vào đầu, từ 1 (yếu) đến 3 (mạnh)
 * @returns {{x: number, y: number}} - Tọa độ mới của tâm ngắm sau khi khoá
 */
function lockHead(inputX, inputY, headX, headY, headLockStrength) {
  let lockedX = inputX;
  let lockedY = inputY;

  if (headLockStrength === 1) {
    // Khoá yếu: di chuyển một phần nhỏ để gần đầu
    lockedX = (inputX + headX) / 2;
    lockedY = (inputY + headY) / 2;
  } else if (headLockStrength === 2) {
    // Khoá trung bình: di chuyển gần hơn vào đầu
    lockedX = (inputX + headX) * 0.75;
    lockedY = (inputY + headY) * 0.75;
  } else if (headLockStrength === 3) {
    // Khoá mạnh: di chuyển chính xác vào đầu
    lockedX = headX;
    lockedY = headY;
  }

  return { x: lockedX, y: lockedY };
}

// Ví dụ sử dụng
let inputX = 60.0;  // Tọa độ X ban đầu của tâm ngắm
let inputY = 55.0;  // Tọa độ Y ban đầu của tâm ngắm

let headX = 50.0;   // Tọa độ X đầu mục tiêu
let headY = 50.0;   // Tọa độ Y đầu mục tiêu

let headLockStrength = 2; // Mức độ khoá: 1 - yếu, 3 - mạnh

const lockedPos = lockHead(inputX, inputY, headX, headY, headLockStrength);
console.log(`Tọa độ sau khi khoá đầu: (${lockedPos.x.toFixed(2)}, ${lockedPos.y.toFixed(2)})`);
