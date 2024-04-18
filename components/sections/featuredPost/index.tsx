import Image from 'next/image';
import Link from 'next/link';

const FeaturedPost = () => {
  return (
    <section className="py-10">
      <div className="container mx-auto flex flex-col md:flex-row md:items-center gap-4 px-4 md:px-10">
        <div className="w-[90%] md:w-9/10 pb-6 md:pb-0">
          <p className="font-bold">
            사내 기술 블로그 플랫폼을 구축하였습니다. 이 프로젝트는 서버리스
            아키텍처, 관리자 페이지의 보안 접근, 지속적인 통합 및 배포, 다중
            리전 데이터 복제, 그리고 자동화된 트래픽 관리 및 로그 분석 기능을
            포함합니다.
          </p>

          <p className="mb-5">
            더 자세한 내용은 노션 통하여 확인하실 수 있습니다.
          </p>
          <Link href="https://plant-rice-d9c.notion.site/8bb2b6b353ae4dcb8478db6603596073?pvs=4">
            <a
              target="_blank"
              className="block w-[98px] rounded-lg py-2 px-4 text-white bg-pink-700 "
            >
              노션 링크
            </a>
          </Link>
        </div>

        <div className="relative rounded-lg w-full h-[70vh] shadow-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
          <Image
            src="https://p1-image.s3.ap-northeast-2.amazonaws.com/2aaf7arc.png"
            layout="fill"
            alt="Featured Post"
            objectFit="cover"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
