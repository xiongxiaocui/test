<script lang="ts">
	import PopOver from './../../UI/PopOver.svelte';
	import SearchInput from './SearchInput.svelte';
	export let data
	export let onChange
	let btnRef: HTMLButtonElement
  let searchPopId
  let search = ''
  let searchId = "searchInput"
	let searchPopOver = false

// 搜索数据显示
  $:filteredData = data.filter((o, oi) => {
      const values = Object.values(o).map(item => String(item).toLowerCase())
      const searchIgnore = search && search.toLocaleLowerCase()
      if (search === '') {
        return true
      }
      const result = values.filter((item, ii) =>{
        if (item.includes(searchIgnore)) {
          return true
        }
        return false
      })
      if (result.length >0) {
        return o
      }
      return false
    })

	$:searchNumber = (() => {
		if (search === '') {
			return 0
		}
		return filteredData.length
	})()

	$:onChange(filteredData)

	// 数据的总数
	$:totalNumber = data.length

  // 搜索页面显示隐藏
  function toggleSearchPopover() {
    if (searchPopOver) {
      searchPopOver = false
    } else {
      searchPopOver = true
      searchPopId = btnRef && btnRef.id
      setTimeout(function() {
        const searchElem = document.getElementById(searchId)
        search = ''
        searchElem.focus()
      }, 0)
    }
	}

	  // 搜索
  function handleSearch(e) {
    search = e.detail.value
  }
</script>
  <button id='searchOperation' aria-describedby="tooltip" bind:this={btnRef} on:click={toggleSearchPopover} type="button" class="btn"><span class="btn-icon"><svg viewBox="0 0 16 16" width="16" height="16" fill="#636363" class=""><path d="M13.8 11.7l-1.9-1.9c.4-.7.6-1.5.6-2.3 0-2.8-2.2-5-5-5s-5 2.2-5 5 2.2 5 5 5c.8 0 1.6-.2 2.3-.6l1.9 1.9c.6.6 1.5.6 2.1 0 .6-.6.6-1.5 0-2.1zM7.5 9.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path></svg></span><span>搜索</span></button>
	{#if searchPopOver}
	  <PopOver width={"353px"} height={"48px"} popId={searchPopId}>
	    <div class="content-wrapper" slot="content">
	      <SearchInput bind:id={searchId} searchNumber={searchNumber} totalNumber={totalNumber} on:search={handleSearch} />
	    </div>
	  </PopOver>
	{/if}
<style>
  .content-wrapper{
    display: flex;
  }
</style>