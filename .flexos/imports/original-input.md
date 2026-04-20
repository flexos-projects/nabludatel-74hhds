---
id: import-original-input
title: Original Seed Input
type: import
subtype: brain-dump
createdAt: "2026-04-20T11:46:05.338Z"
---

-- tomorrow there would be an        
  election in bulgaria --- i would like to setup a way to extarct all video     
  links of all sections in bulgaria and randomly - but keep track which i have  
  produced so far i want to extract all mp4 links and then convert the video    
  into text --- what is the best tool to do that its bulgarian --- and then use 
   sonnet to check the text for any manipulations/bad things happening in the   
  counting in the votes --- can u help me wit hthat to build a script that will 
   do that?                                                                     
                                                                                
⏺ I'll help you build this. Let me first look at the site structure and check   
  the working directory.                                        
                                  
❯ i just want to say what u r looking at its an archive u can train on --- the  
  difference is there are limited sections not in all bulgaria and they are two 
   tours -- in reality they will be all sections and no second tour -- this is  
  a map of all the sections for those elections 2026 april -- but i was not     
  able to find a file with a list of all of them --- i think u can get the list 
   from this election but the videos there does nto owrk anymore ---            
  -- -do u have any questions              
                                                                                
⏺ Got it — archive is training data, real election tomorrow will be all         
  sections, single tour. Before I build, a few questions that shape the design: 
                                                                                
  1. Tomorrow's URL pattern: do you know the exact date (e.g. le20260419)? Or   
  should the script probe evideo.bg to auto-detect the current election slug?   
  2. Transcription backend — which do you prefer?                               
    - faster-whisper locally (free, Bulgarian is well-supported by large-v3,    
  needs decent CPU/GPU, slow)                                                   
    - OpenAI Whisper API (~$0.006/min, fast, you need an API key)               
    - Groq whisper-large-v3 (very fast, cheap, has free tier)                   
                                                                                
  For ~12k sections × ~1h videos this matters a lot. I'd default to Groq for    
  volume + speed, fallback to local.                                            
  3. Analysis model: you said Sonnet — Anthropic API key available? I'd use     
  claude-sonnet-4-6 with prompt caching (cache the "what to look for"           
  instructions).                                                     
  4. Video length strategy: counting happens after polls close (20:00). Videos  
  can be many hours. Should we:                                                 
    - Download whole video then transcribe, or                       
    - Stream/chunk and transcribe incrementally (can flag issues faster)?       
  5. Section list: I'll scrape the europe2024 archive to get the full           
  ОИК/municipality/section tree as a seed list, then on election day map those  
  to the new slug. OK?                                                          
  6. Random sampling: how many per hour? All of them, or a rolling random sample
   until every section is covered once?                                         
  7. Output: where should flagged transcripts go — local SQLite + JSON reports,
  or somewhere shareable?                                                       
                                                                
  While you answer, I'll start scraping the full section structure from         
  europe2024 so we have the master list ready.                  
                                                                                
❯ 1 that is the date -- 20260420 --- 2 lets test the free version and see if it 
   will work well if not we will move the other options --- 3 for sonnet u can  
  use headless mode --- https://code.claude.com/docs/en/headless --- 4     -    
  Download whole video then transcribe, or                                      
  5 - ok - 6 - random but at the end they should be all of them --- and i       
  prefer to start with villages / small city and then move to the big citis --- 
   7 - for now create a simple html that will show a dashboard and report as    
  details as possible which section - what was reported --- the levle of report 
   - also a link to the original video -- if possible also u can point around   
  which min of the video that would be helpful - u can use local sql to store   
  the data stored in the same folder --- do u have more questions?              
                                                                                
⏺ Three more and I'll start building in parallel:                               
                                                                                
  1. Disk space: can the pipeline delete videos after transcription succeeds? (a
   single section can be several GB; keeping 12k × GB won't fit locally)
  2. Where does this run — your Mac, or a remote server? Affects parallelism and
   scheduling.                                                                  
  3. claude -p availability: is the claude CLI installed and logged in on the
  machine that will run this? (I'll verify.)                                    
                                                                
  For the Sonnet prompt (what counts as "manipulation/bad things"), I'll draft a
   first version covering: ballot tampering, miscalled votes, intimidation of   
  SIK members, unauthorized persons present, protocol discrepancies, unexplained
   delays, ballot substitution, disputes not logged. You can refine.
                                                                     
the real url is - 
https://evideo.bg/pe202604/index.html
