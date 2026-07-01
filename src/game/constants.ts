export const CANVAS_WIDTH = 400;
export const CANVAS_HEIGHT = 600;

export const GRAVITY = 0.22;
export const JUMP_VELOCITY = -8;
export const MAX_FALL_SPEED = 15;
export const PLAYER_SPEED = 4;
export const PLAYER_WIDTH = 54;
export const PLAYER_HEIGHT = 54;

export const PLATFORM_WIDTH = 80;
export const PLATFORM_HEIGHT = 16;
export const PLATFORM_MOVE_SPEED = 1.5;

// px вище cameraY щоб тримати платформи у буфері
export const PLATFORM_BUFFER = 200;

export const GAP_MIN = 55;
export const GAP_MAX = 90;

// Гравець починає рухати камеру при досягненні цього % висоти
export const CAMERA_FOLLOW_RATIO = 0.4;

// Ваги типів платформ на старті
export const WEIGHT_NORMAL = 0.65;
export const WEIGHT_MOVING = 0.25;
export const WEIGHT_BREAKABLE = 0.10;

export const TINT_MOVING = 'rgba(100,149,237,0.55)';
export const TINT_BREAKABLE = 'rgba(160,82,45,0.60)';

export const BREAK_ANIM_DURATION = 20;
