const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

const starsWrapper = document.querySelector(".intro__screen");
const starsBlock1 = document.querySelector(".stars-block--1");
const starsBlock2 = document.querySelector(".stars-block--2");
const starsBlock3 = document.querySelector(".stars-block--3");

const cellWidthRange = { min: 120, max: 150 };
const cellHeightRange = { min: 120, max: 150 };

function random(min, max) {
	return Math.floor(min + Math.random() * (max - min));
}

function createSubdivRange(fromTo, minMax) {
	const out = [];
	let position = fromTo.from;

	do {
		const size = lerp(minMax.min, minMax.max, Math.random());
		out.push({ position, size });
		position += size;
	} while (position < fromTo.to);

	return out;
}

const cols = createSubdivRange(
	{ from: 0, to: starsWrapper.clientWidth },
	cellWidthRange
);
const rows = createSubdivRange(
	{ from: 0, to: starsWrapper.clientHeight },
	cellHeightRange
);

function appendBgBlockToWrapper(bgBlockNode, nodeList) {
	bgBlockNode.append(...nodeList);

	const clone = bgBlockNode.cloneNode(true);
	clone.classList.add("stars-block--clone");

	starsWrapper.append(clone);
}

function createStars(wrapperNode, sizeDivider = 6) {
	const nodeList = [];

	for (let ci = 0; ci < cols.length; ci++) {
		for (let ri = 0; ri < rows.length; ri++) {
			const { position: x, size: width } = cols[ci];
			const { position: y, size: height } = rows[ri];

			const left = lerp(x, x + width, Math.random());
			const top = lerp(y, y + height, Math.random());

			const span = document.createElement("span");

			span.classList.add("stars-item", `stars-item--${random(1, 38)}`);
			span.style.width = `${width / sizeDivider}px`;
			span.style.height = `${height / sizeDivider}px`;
			span.style.top = `${top}px`;
			span.style.left = `${left}px`;

			nodeList.push(span);
		}
	}

	appendBgBlockToWrapper(wrapperNode, nodeList);
}

createStars(starsBlock1);
createStars(starsBlock2, 4.5);
createStars(starsBlock3, 1.5);

starsWrapper.classList.add("active");
