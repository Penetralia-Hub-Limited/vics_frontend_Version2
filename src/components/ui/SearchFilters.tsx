import type { NextPage } from 'next';



const SearchFilter:NextPage = () => {
  	return (
    		<div className="w-full relative rounded-lg bg-foundation-white border-foundation-neutral-neutral-400 border-solid border-[1px] box-border flex flex-col items-start justify-start py-[1.5rem] px-[1rem] text-left text-[1rem] text-foundation-black font-helvetica">
      			<div className="self-stretch flex flex-col items-start justify-start gap-[1.5rem]">
        				<div className="self-stretch flex flex-row items-end justify-start gap-[1rem]">
          					<div className="flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
            						<div className="self-stretch relative leading-[1.5rem]">Plate Number</div>
            						<div className="self-stretch rounded-lg border-foundation-neutral-neutral-400 border-solid border-[1px] box-border h-[3.25rem] flex flex-col items-start justify-center py-[0rem] px-[1rem] text-[0.875rem] text-foundation-neutral-neutral-700">
              							<div className="self-stretch relative">placeholder</div>
            						</div>
          					</div>
          					<div className="flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
            						<div className="self-stretch relative leading-[1.5rem]">Chasis Number</div>
            						<div className="self-stretch rounded-lg border-foundation-neutral-neutral-400 border-solid border-[1px] box-border h-[3.25rem] flex flex-col items-start justify-center py-[0rem] px-[1rem] text-[0.875rem] text-foundation-neutral-neutral-700">
              							<div className="self-stretch relative">placeholder</div>
            						</div>
          					</div>
          					<div className="flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
            						<div className="self-stretch relative leading-[1.5rem]">Engine Number</div>
            						<div className="self-stretch rounded-lg border-foundation-neutral-neutral-400 border-solid border-[1px] box-border h-[3.25rem] flex flex-col items-start justify-center py-[0rem] px-[1rem] text-[0.875rem] text-foundation-neutral-neutral-700">
              							<div className="self-stretch relative">placeholder</div>
            						</div>
          					</div>
          					<div className="w-[10rem] rounded-lg bg-foundation-primary-primary-500 h-[3.25rem] overflow-hidden shrink-0 flex flex-row items-center justify-center py-[0.75rem] px-[1.5rem] box-border text-center text-foundation-white">
            						<b className="w-[7rem] relative inline-block shrink-0">Search</b>
          					</div>
        				</div>
        				<div className="w-[65rem] hidden flex-row items-center justify-start gap-[1rem]">
          					<div className="flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
            						<div className="self-stretch relative leading-[1.5rem]">Zone Office</div>
            						<div className="self-stretch rounded-lg border-foundation-neutral-neutral-400 border-solid border-[1px] box-border h-[3.25rem] flex flex-col items-start justify-center py-[0rem] px-[1rem] text-center text-[0.875rem] text-foundation-neutral-neutral-900">
              							<div className="self-stretch relative">-- Select Office --</div>
            						</div>
          					</div>
          					<div className="flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
            						<div className="self-stretch relative leading-[1.5rem]">MLA</div>
            						<div className="self-stretch rounded-lg border-foundation-neutral-neutral-400 border-solid border-[1px] box-border h-[3.25rem] flex flex-col items-start justify-center py-[0rem] px-[1rem] text-center text-[0.875rem] text-foundation-neutral-neutral-900">
              							<div className="self-stretch relative">-- Select MLA --</div>
            						</div>
          					</div>
          					<div className="flex-1 flex flex-col items-start justify-start gap-[0.75rem]">
            						<div className="self-stretch relative leading-[1.5rem]">{`Plate `}</div>
            						<div className="self-stretch rounded-lg border-foundation-neutral-neutral-400 border-solid border-[1px] box-border h-[3.25rem] flex flex-col items-start justify-center py-[0rem] px-[1rem] text-[0.875rem] text-foundation-neutral-neutral-700">
              							<div className="self-stretch relative">placeholder</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default SearchFilter;
