<!-- ============================================================================
     GitHub Profile README - academic edition, black-terminal theme
     ----------------------------------------------------------------------------
     LANGUAGE SWITCH
       English is expanded by default, 中文 lives in the second <details> block.
       GitHub strips JavaScript and CSS from READMEs, so <details>/<summary>
       is the only reliable way to build a language toggle: click a badge.
     STRUCTURE
       prose sections (whoami / research / publications / news) are duplicated in
       both languages. The dashboard sections (projects / stats / contributions /
       stack) live once, below the toggle, with bilingual captions - every extra
       copy costs another request to a third-party card service, and those
       services rate-limit aggressively.
     PLACEHOLDERS
       Every {{PLACEHOLDER}} must be replaced before publishing.
       Full checklist + service list + config steps: PROFILE_SETUP.md
     ASSETS
       assets/banner.svg                 hero banner
       assets/cards/paper-*.svg          publication cards (edit text in the SVG)
       assets/cards/more-papers.svg      "all publications" card
       assets/contribution-graph.svg     regenerated daily by contributions.yml
     NOTE
       Inline code uses <code>...</code> rather than backticks so the file stays
       trivially greppable and sed-able. Both render identically on GitHub.
     ============================================================================ -->

<div align="center">
  <img src="assets/banner.svg" width="100%" alt="Terminal banner - Haoliang Cheng, PhD Candidate, research focus AI Agent, open to work">
</div>

<!-- shared contact row: language-neutral, so it is not duplicated -->
<p align="center">
  <a href="mailto:chl19940220@gmail.com"><img alt="Email" src="https://img.shields.io/badge/Email-000000?style=flat-square&logo=gmail&logoColor=EA4335"></a>
  <a href="https://scholar.google.com.hk/citations?user=mJhj5bEAAAAJ&hl=en"><img alt="Google Scholar" src="https://img.shields.io/badge/Google_Scholar-000000?style=flat-square&logo=googlescholar&logoColor=39d353"></a>
  <a href="https://orcid.org/0009-0000-4370-9309"><img alt="ORCID" src="https://img.shields.io/badge/ORCID-000000?style=flat-square&logo=orcid&logoColor=A6CE39"></a>
  <a href="{{CV_PDF_URL}}"><img alt="CV" src="https://img.shields.io/badge/CV-000000?style=flat-square&logo=adobeacrobatreader&logoColor=EC1C24"></a>
  <a href="https://github.com/chl19940220"><img alt="GitHub" src="https://img.shields.io/badge/GitHub-000000?style=flat-square&logo=github&logoColor=ffffff"></a>
</p>

<p align="center"><sub>Language / 语言 &mdash; click a badge to expand or collapse</sub></p>

<!-- ============================ ENGLISH (default) ============================ -->
<details open>
<summary align="center"><img height="26" alt="English (expanded)" src="https://img.shields.io/badge/%E2%96%B8_EN-English-39d353?style=flat-square&labelColor=000000"></summary>

## <code>$ whoami</code>

> **PhD Candidate** &middot; Nanjing University
> Research focus: **AI Agent** &middot; Software Engineering

&nbsp;&nbsp;&#9656; **About** &mdash; {{BIO_EN}}
&nbsp;&nbsp;&#9656; **Based in** &mdash; NanJing, China
&nbsp;&nbsp;&#9656; **Status** &mdash; &#128188; **Open to work**

---

## <code>$ tree research/ -L 2</code>

<pre>
research/
├── AI Agent/                    # AI Agent
│   ├── {{RESEARCH_TOPIC_1}}
│   └── {{RESEARCH_TOPIC_2}}
├── Software Engineering/
    └── {{RESEARCH_TOPIC_3}}
</pre>

---

## <code>$ ls -lt publications/</code>

<!-- card text limits: title <= 42 chars per line, authors <= 52, venue line <= 50 -->

<p align="center">
  <a href="https://dl.acm.org/doi/abs/10.1145/3832200"><img width="48.5%" src="assets/cards/paper-1.svg" alt="Steering Tree-of-Thought Reasoning via Deductive Verification"></a>
  <a href="https://www.sciengine.com/Jsoft/doi/10.13328/j.cnki.jos.005873"><img width="48.5%" src="assets/cards/paper-2.svg" alt="Approach of Sketch-guided GUI Testing for Mobile App"></a>
</p>


---

## <code>$ tail -n 3 news.log</code>

- **[{{NEWS_1_DATE}}]** {{NEWS_1_EN}}
- **[{{NEWS_2_DATE}}]** {{NEWS_2_EN}}
- **[{{NEWS_3_DATE}}]** {{NEWS_3_EN}}

</details>

<!-- ============================ 中文（默认折叠） ============================ -->
<details>
<summary align="center"><img height="26" alt="中文（点击展开）" src="https://img.shields.io/badge/%E2%96%B8_%E4%B8%AD%E6%96%87-Chinese-30363d?style=flat-square&labelColor=000000"></summary>

## <code>$ whoami</code>

> **博士研究生（PhD Candidate）** &middot; Nanjing University {{LAB_NAME}}
> 研究方向：**AI Agent** &middot; Software Engineering

&nbsp;&nbsp;&#9656; **简介** &mdash; {{BIO_ZH}}
&nbsp;&nbsp;&#9656; **所在地** &mdash; NanJing, China
&nbsp;&nbsp;&#9656; **状态** &mdash; &#128188; **正在找工作**

---

## <code>$ tree research/ -L 2</code>

<pre>
research/
├── AI Agent/                    # AI Agent
│   ├── {{RESEARCH_TOPIC_1}}
│   └── {{RESEARCH_TOPIC_2}}
├── Software Engineering/
│   └── {{RESEARCH_TOPIC_3}}
└── {{RESEARCH_AREA_3}}/
    └── {{RESEARCH_TOPIC_4}}
</pre>

---

## <code>$ ls -lt publications/</code>

<p align="center">
  <a href="https://dl.acm.org/doi/abs/10.1145/3832200"><img width="48.5%" src="assets/cards/paper-1.svg" alt="Steering Tree-of-Thought Reasoning via Deductive Verification"></a>
  <a href="https://www.sciengine.com/Jsoft/doi/10.13328/j.cnki.jos.005873"><img width="48.5%" src="assets/cards/paper-2.svg" alt="Approach of Sketch-guided GUI Testing for Mobile App"></a>
</p>

<p align="center">
  <a href="https://scholar.google.com.hk/citations?user=mJhj5bEAAAAJ&hl=en"><img width="48.5%" src="assets/cards/more-papers.svg" alt="全部论文 · Google Scholar"></a>
</p>

---

## <code>$ tail -n 3 news.log</code>

- **[{{NEWS_1_DATE}}]** {{NEWS_1_ZH}}
- **[{{NEWS_2_DATE}}]** {{NEWS_2_ZH}}
- **[{{NEWS_3_DATE}}]** {{NEWS_3_ZH}}

</details>

<!-- ================= dashboard sections (shared, bilingual) ================= -->

---

## <code>$ ls projects/</code>

<sub>Selected projects &middot; 主要项目</sub>

<p align="center">
  <a href="https://github.com/chl19940220/Deductive-Steering"><img width="48.5%" alt="Deductive-Steering" src="https://github-readme-stats.vercel.app/api/pin/?username=chl19940220&repo=Deductive-Steering&bg_color=000000&title_color=39d353&text_color=c9d1d9&icon_color=39d353&border_color=30363d"></a>
  <a href="https://github.com/chl19940220/llm4se-research"><img width="48.5%" alt="llm4se-research" src="https://github-readme-stats.vercel.app/api/pin/?username=chl19940220&repo=llm4se-research&bg_color=000000&title_color=39d353&text_color=c9d1d9&icon_color=39d353&border_color=30363d"></a>
</p>

<p align="center">
  <a href="https://github.com/chl19940220/chl19940220.github.io"><img width="48.5%" alt="chl19940220.github.io" src="https://github-readme-stats.vercel.app/api/pin/?username=chl19940220&repo=chl19940220.github.io&bg_color=000000&title_color=39d353&text_color=c9d1d9&icon_color=39d353&border_color=30363d"></a>
  <a href="https://github.com/chl19940220/mtef-latex"><img width="48.5%" alt="mtef-latex" src="https://github-readme-stats.vercel.app/api/pin/?username=chl19940220&repo=mtef-latex&bg_color=000000&title_color=39d353&text_color=c9d1d9&icon_color=39d353&border_color=30363d"></a>
</p>

---

## <code>$ ./stats.sh --github</code>

<sub>Live GitHub statistics &middot; GitHub 实时统计</sub>

<p align="center">
  <img width="49%" alt="GitHub stats" src="https://github-readme-stats.vercel.app/api?username=chl19940220&show_icons=true&include_all_commits=true&rank_icon=github&bg_color=000000&title_color=39d353&text_color=c9d1d9&icon_color=39d353&border_color=30363d&custom_title=GitHub%20Stats">
  <img width="49%" alt="Top languages" src="https://github-readme-stats.vercel.app/api/top-langs/?username=chl19940220&layout=compact&langs_count=8&bg_color=000000&title_color=39d353&text_color=c9d1d9&border_color=30363d&custom_title=Top%20Languages">
</p>

---

## <code>$ ./contributions.sh --last-year</code>

<sub>Rolling 365-day contribution graph &middot; 近一年贡献图</sub>

<div align="center">
  <img width="100%" alt="Contribution graph for the last 365 days" src="assets/contribution-graph.svg">
</div>

<sub>Rendered locally and refreshed daily by <a href=".github/workflows/contributions.yml">contributions.yml</a> &mdash; 由 GitHub Actions 每日自动更新，不依赖第三方卡片服务。</sub>

---

## <code>$ cat stack.txt</code>

<sub>Languages and tools &middot; 常用语言与工具</sub>

<p align="center">
  <img alt="Python" src="https://img.shields.io/badge/Python-000000?style=flat-square&logo=python&logoColor=39d353">
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-000000?style=flat-square&logo=typescript&logoColor=39d353">
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-000000?style=flat-square&logo=javascript&logoColor=39d353">
  <img alt="MATLAB" src="https://img.shields.io/badge/MATLAB-000000?style=flat-square&logo=mathworks&logoColor=39d353">
  <img alt="HTML5" src="https://img.shields.io/badge/HTML5-000000?style=flat-square&logo=html5&logoColor=39d353">
  <img alt="CSS3" src="https://img.shields.io/badge/CSS3-000000?style=flat-square&logo=css3&logoColor=39d353">
  <img alt="Git" src="https://img.shields.io/badge/Git-000000?style=flat-square&logo=git&logoColor=39d353">
</p>

<!-- add more with this pattern (slug list: https://simpleicons.org):
     <img alt="NAME" src="https://img.shields.io/badge/NAME-000000?style=flat-square&logo=SIMPLEICONS_SLUG&logoColor=39d353"> -->

---

<p align="center"><sub><code>$ exit 0</code> &middot; black-terminal profile kit &middot; <a href="#top">back to top</a></sub></p>
