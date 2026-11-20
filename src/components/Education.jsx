import React from 'react';
import Section from './common/Section';
import Heading from './common/Heading';
import PdfViewer from './common/PdfViewer';

export default function Education() {
  return (
    <Section id="education">
      <Heading>Education & certification</Heading>
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="lift rounded-2xl bg-coal border border-white/5 p-6 sm:p-8">
          <p className="text-mute text-sm">Aug. 2023 – Jul. 2027</p>
          <h3 className="font-display text-xl sm:text-2xl font-bold mt-2">Bachelor of Science in Information Technology</h3>
          <p className="text-oak mt-1">STI College Legazpi</p>
          <p className="text-mute text-sm mt-1">Legazpi City, Albay, Philippines</p>
        </div>
        <div className="lift flex flex-col rounded-2xl bg-coal border border-white/5 p-6 sm:p-8">
          <p className="text-mute text-sm">Issued Jun. 19, 2024</p>
          <h3 className="font-display text-xl sm:text-2xl font-bold mt-2">Java Fundamentals</h3>
          <p className="text-oak mt-1">Oracle Academy</p>
          <p className="text-mute text-sm mt-1">Award of Course Completion</p>
          <PdfViewer />
        </div>
      </div>
    </Section>
  );
}
