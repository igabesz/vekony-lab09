function hitCenterRect(s1: PIXI.Sprite, s2: PIXI.Sprite, ratio = 1.0) {
	if (!s1 || !s2) return false;
	let dx = Math.abs(s1.x - s2.x);
	let width = (s1.width + s2.width) / 2;
	if (dx > width * ratio) return false;
	let dy = Math.abs(s1.y - s2.y);
	let height = (s1.height + s2.height) / 2;
	if (dy > height * ratio) return false;
	return true;
}
