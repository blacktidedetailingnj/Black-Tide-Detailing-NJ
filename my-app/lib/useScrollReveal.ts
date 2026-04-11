"use client";

import { useEffect } from "react";

export function useScrollReveal(threshold = 0.15) {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("reveal-visible");
						observer.unobserve(entry.target);
					}
				});
			},
			{ threshold },
		);

		const elements = document.querySelectorAll(".reveal");
		elements.forEach((el) => observer.observe(el));

		return () => observer.disconnect();
	}, [threshold]);
}
