const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t;

const bgWrapper = document.querySelector(".intro__screen");
const bgBlock1 = document.querySelector(".bg-block--1");
const bgBlock2 = document.querySelector(".bg-block--2");
const bgBlock3 = document.querySelector(".bg-block--3");
const nodeList1 = [];
const nodeList2 = [];
const nodeList3 = [];

const cellWidthRange = { min: 60, max: 90 };
const cellHeightRange = { min: 60, max: 90 };

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
	{ from: 0, to: bgWrapper.clientWidth },
	cellWidthRange
);
const rows = createSubdivRange(
	{ from: 0, to: bgWrapper.clientHeight },
	cellHeightRange
);

for (let ci = 0; ci < cols.length; ci++) {
	for (let ri = 0; ri < rows.length; ri++) {
		const { position: x, size: width } = cols[ci];
		const { position: y, size: height } = rows[ri];

		const left = lerp(x, x + width, Math.random());
		const top = lerp(y, y + height, Math.random());

		const span = document.createElement("span");

		span.classList.add("bg-item", `bg-item--${random(1, 38)}`);
		span.style.width = `${width / 3}px`;
		span.style.height = `${height / 3}px`;
		span.style.top = `${top}px`;
		span.style.left = `${left}px`;

		if ((ri + 1) % 3 === 0) {
			nodeList3.push(span);
		} else if ((ri + 1) % 2 === 0) {
			nodeList2.push(span);
		} else {
			nodeList1.push(span);
		}
	}
}

bgBlock1.append(...nodeList1);
bgBlock2.append(...nodeList2);
bgBlock3.append(...nodeList3);

console.log(
	"nodeList1: ",
	nodeList1.length,
	nodeList2.length,
	nodeList3.length
);
