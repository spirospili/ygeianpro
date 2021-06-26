@extends('admin.app')

@section('content')

<div class="row mb-4">
    <div class="col-sm-12 dataTables_filter">
        <form method="GET">
            <input type="hidden" name="action" value="{{request()->action}}" />
            <div class="input-group">
                <input type="text" id="keywords" class="input-sm form-control" name="keywords" placeholder="Search" value="{{ request()->keywords }}">
                <span class="input-group-btn">
                    <!-- <input class="btn btn btn-primary" type="submit" value="Go!"> -->
                </span>
            </div>
        </form>
    </div>
</div>
<div class="row">
    <div class="col-md-12 text-right mb-4">
        <a href="{{ route('admin.masterclass.create') }}" class="btn btn-primary">Add Hospital</a>
    </div>
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
            <div class="table-responsive">
                @if($hospitals->isNotEmpty())
                <table class="ui celled table" id="masterclasstable">
                    <thead>
                        <tr>
                            <th></th>
                            <th>ID</th>
                            <th>Hospital Name</th>

                        </tr>
                    </thead>
                    <tbody>
                        @foreach($hospitals as $hospital)
                        <tr>
                            <td class="details-control"></td>
                            <td>{{$hospital->id}}</td>
                            <td>{{ $hospital->hospital_name}}</td>
                            <td>
                                <a href="{{ route('admin.hospital.edit', $hospital->id) }}">
                                    Edit
                                </a>
                                |
                                <a href="{{ route('admin.hospital.destroy', $hospital->id) }}"
                                    onclick="event.preventDefault();
                                        document.getElementById('destroy-form{{$hospital->id}}').submit();">
                                    Delete
                                </a>

                                <form id="destroy-form{{$hospital->id}}" action="{{ route('admin.hospital.destroy', $hospital->id) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    <input type="hidden" name="_method" value="DELETE" /> 
                                </form>
                            </td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                    @else
                    <p class="text-center">No Hospitals</p>
                    @endif
                  </div>
            </div>
        </div>
    </div>    
</div>
<script>
$(document).ready(function() {
    /* Formatting function for row details - modify as you need */
    function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td>'+d.name+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td>'+d.extn+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
    }

    
    oTable =$('#masterclasstable').DataTable({
        "dom": '<"top"i>rt<"bottom"><"clear">'
    });
    $('#keywords').keyup(function(){
      oTable.search($(this).val()).draw() ;
    })

     
} );


</script>		
@endsection