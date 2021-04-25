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
        <a href="{{ route('admin.team.create') }}" class="btn btn-primary">Add Team</a>
    </div>
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
            <div class="table-responsive">
                @if($teams->isNotEmpty())
                <table class="ui celled table" id="teamstable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Lead team</th>
                            <th>Speciality</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach($teams as $team)
                        <tr>
                            <td>{{$team->team_id}}</td>
                            <td>{{ $team->team_name }}</td>
                            <td>{{ $team->TeamLead_name }}</td>
                            <td>{{ $team->team_speciality }}</td>
                            <td>
                                <a href="{{ route('admin.team.edit', $team->team_id) }}">
                                    Edit
                                </a>
                                |
                                <a href="{{ route('admin.team.destroy', $team->team_id) }}"
                                    onclick="event.preventDefault();
                                        document.getElementById('destroy-form{{$team->team_id}}').submit();">
                                    Delete
                                </a>

                                <form id="destroy-form{{$team->team_id}}" action="{{ route('admin.team.destroy', $team->team_id) }}" method="POST" style="display: none;">
                                    {{ csrf_field() }}
                                    <input type="hidden" name="_method" value="DELETE" /> 
                                </form>
                            </td>
                        </tr>
                        @endforeach
                      </tbody>
                    </table>
                    @else
                    <p class="text-center">No Teams</p>
                    @endif
                  </div>
            </div>
        </div>
    </div>    
</div>
<script>
$(document).ready(function() {
    oTable =$('#teamstable').DataTable({
        "dom": '<"top"i>rt<"bottom"><"clear">'
    });
    $('#keywords').keyup(function(){
      oTable.search($(this).val()).draw() ;
    })
} );
</script>		
@endsection