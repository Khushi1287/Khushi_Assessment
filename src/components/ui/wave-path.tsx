'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useRef, useEffect } from 'react';

type WWavePathProps = React.ComponentProps<'div'>;

export function WavePath({ className, ...props }: WWavePathProps) {
	const path = useRef<SVGPathElement>(null);
	let progress = 0;
	let x = 0.2;
	let time = Math.PI / 2;
	let reqId: number | null = null;

	useEffect(() => {
		setPath(progress);
	}, []);

	const setPath = (progress: number) => {
		const width = window.innerWidth * 0.7;
		if (path.current) {
			path.current.setAttributeNS(
				null,
				'd',
				`M0 100 Q${width * x} ${100 + progress * 0.6}, ${width} 100`,
			);
		}
	};

	const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

	const manageMouseEnter = () => {
		if (reqId) {
			cancelAnimationFrame(reqId);
			resetAnimation();
		}
	};

	const manageMouseMove = (e: React.MouseEvent) => {
		const { movementY, clientX } = e;
		if (path.current) {
			const pathBound = path.current.getBoundingClientRect();
			x = (clientX - pathBound.left) / pathBound.width;
			progress += movementY;
			setPath(progress);
		}
	};

	const manageMouseLeave = () => {
		animateOut();
	};

	const animateOut = () => {
		const newProgress = progress * Math.sin(time);
		progress = lerp(progress, 0, 0.025);
		time += 0.2;
		setPath(newProgress);
		if (Math.abs(progress) > 0.75) {
			reqId = requestAnimationFrame(animateOut);
		} else {
			resetAnimation();
		}
	};

	const resetAnimation = () => {
		time = Math.PI / 2;
		progress = 0;
	};

	return (
		<div className="relative w-full py-16 flex flex-col items-center justify-center">
			<div
				aria-hidden="true"
				className={cn(
					'pointer-events-none absolute -top-10 left-1/2 size-full -translate-x-1/2 rounded-full',
					'bg-[radial-gradient(ellipse_at_center,--theme(--color-foreground/.1),transparent_50%)]',
					'blur-[30px]',
				)}
			/>

			<div className="flex w-[70vw] flex-col items-end">
			<div className={cn('relative h-px w-[70vw]', className)} {...props}>
			<div
				onMouseEnter={manageMouseEnter}
				onMouseMove={manageMouseMove}
				onMouseLeave={manageMouseLeave}
				className="relative -top-5 z-10 h-10 w-full hover:-top-[150px] hover:h-[300px]"
			/>
			<svg className="absolute -top-[100px] h-[300px] w-full opacity-20">
				<path ref={path} className="fill-none stroke-current" strokeWidth={2} />
			</svg>
		</div>
				<div className="flex w-full flex-col my-16 items-end">
					<div className="flex justify-end">
						<p className="text-muted-foreground mt-2 text-sm">persona</p>
						<p className="text-foreground/80 ml-8 w-3/4 text-2xl md:text-4xl">
							Transform your life stories into beautiful memories. Let AI-powered
							insights and smart organization help you document your journey.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
